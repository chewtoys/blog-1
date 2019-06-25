import * as React from 'react';
import * as next from 'next';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import useWindowScroll from 'react-use/lib/useWindowScroll';
import useDebounce from 'react-use/lib/useDebounce';

import Layout from '../components/Layout';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';
import Copyright from '../components/Copyright';
import Loading from '../components/Loading';
import Github from '../lib/github';

interface IIndexPageProps {
  issues: IGithubIssues;
  recommend: IGithubIssues;
  labels: IGithubLabels;
}

enum ActionTypes {
  LOADING,
  LOADED,
  RESET,
}

const reducer = (state: IGithubLabels, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.LOADED:
      return {
        nodes: [...state.nodes, ...payload.nodes],
        pageInfo: payload.pageInfo,
      };
    case ActionTypes.RESET:
      return { ...state };
    default:
      return state;
  }
};

const PostList = styled.div`
  max-width: 650px;
`;

const IndexPage: next.NextFunctionComponent<IIndexPageProps> = (props) => {
  const { issues, recommend, labels } = props;
  const [state, dispatch] = React.useReducer(reducer, issues);
  const { nodes, pageInfo } = state as IGithubIssues;

  const { y } = useWindowScroll();
  useDebounce(
    () => {
      const { scrollHeight, clientHeight } = window.document.documentElement;
      if (y === scrollHeight - clientHeight) {
        Github.createWithContext()
          .issues(pageInfo.endCursor)
          .then((newIssues) => {
            dispatch({
              type: ActionTypes.LOADED,
              payload: newIssues,
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
      payload: issues,
    });
  }, [issues]);

  return (
    <Layout>
      <Row>
        <Col lg={8}>
          <PostList>
            {nodes.map((node: IGithubIssue) => (
              <Post key={node.id} data={node} excerpt />
            ))}
            <Loading visiable={pageInfo.hasNextPage} />
          </PostList>
        </Col>
        <Col lg={4}>
          <Sidebar dataSource={{ recommend, labels }} />
          <Copyright />
        </Col>
      </Row>
    </Layout>
  );
};

IndexPage.getInitialProps = async (ctx: next.NextContext) => {
  const github = Github.createWithContext(ctx);

  const issues = await github.issues();
  const recommend = await github.recommend();
  const labels = await github.labels();

  return {
    issues,
    recommend,
    labels,
  };
};

export default IndexPage;
