import * as React from 'react';
import _ from 'lodash/fp';

type LoadCallback = (pageInfo: IGithubPageInfo) => Promise<IGithubIssues>;

interface IReducerState extends IGithubIssues {
  loading: boolean;
}

interface IReducerAction {
  type: ActionTypes;
  payload?: IGithubIssues;
}

enum ActionTypes {
  LOADING,
  LOADED,
  RESET,
}

const init = (initState: IGithubIssues): IReducerState => ({
  ...initState,
  loading: false,
});

const reducer = (state: IReducerState, action: IReducerAction) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.LOADING:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.LOADED:
      return {
        nodes: _.uniqBy('id', [...state.nodes, ...payload!.nodes]),
        pageInfo: payload!.pageInfo,
        loading: false,
      };
    case ActionTypes.RESET:
      return init(payload!);
    default:
      return state;
  }
};

const useLoadMore = (
  initState: IGithubIssues,
  loadCallback: LoadCallback,
): [IReducerState, () => void] => {
  // @ts-ignore
  const [state, dispatch] = React.useReducer(reducer, initState, init);
  const { pageInfo } = state;

  const loadHandler = () => {
    dispatch({ type: ActionTypes.LOADING });
    loadCallback(pageInfo).then((more: IGithubIssues) => {
      dispatch({
        type: ActionTypes.LOADED,
        payload: more,
      });
    });
  };

  React.useEffect(() => {
    dispatch({
      type: ActionTypes.RESET,
      payload: initState,
    });
  }, [initState]);

  return [state, loadHandler];
};

export default useLoadMore;
