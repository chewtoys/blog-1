import * as React from 'react';
import _ from 'lodash/fp';
import useWindowScroll from 'react-use/lib/useWindowScroll';
import useDebounce from 'react-use/lib/useDebounce';

type LoadMoreFunction = (pageInfo: IGithubPageInfo) => Promise<IGithubIssues>;

interface IAction {
  type: ActionTypes;
  payload: IGithubIssues;
}

enum ActionTypes {
  LOADING,
  LOADED,
  RESET,
}

const reducer = (state: IGithubIssues, action: IAction) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.LOADED:
      return {
        nodes: _.uniqBy('id', [...state.nodes, ...payload.nodes]),
        pageInfo: payload.pageInfo,
      };
    case ActionTypes.RESET:
      return { ...payload };
    default:
      return state;
  }
};

const useLoadMore = (initState: IGithubIssues, fn: LoadMoreFunction) => {
  const [state, dispatch] = React.useReducer(reducer, initState);
  const { pageInfo } = state as IGithubIssues;

  const { y } = useWindowScroll();
  useDebounce(
    () => {
      const { scrollHeight, clientHeight } = window.document.documentElement;
      if (y === scrollHeight - clientHeight) {
        fn(pageInfo).then((next: IGithubIssues) => {
          dispatch({
            type: ActionTypes.LOADED,
            payload: next,
          });
        });
      }
    },
    500,
    [y],
  );

  React.useEffect(() => {
    dispatch({
      type: ActionTypes.RESET,
      payload: initState,
    });
  }, [initState]);

  return state;
};

export default useLoadMore;
