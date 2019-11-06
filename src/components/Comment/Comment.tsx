import * as React from 'react';
import styled from 'styled-components';
import Gitalk from 'gitalk';
import 'gitalk/dist/gitalk.css';

import { getConfig } from '../../utils';

const { owner, repo, theme } = getConfig();

interface ICommentProps {
  issueNumber: number;
}

const GitalkContainer = styled.div`
  & .gt-container {
    & a {
      color: ${theme.color};
      box-shadow: none;
      border-bottom: none;
    }
    & .gt-svg svg {
      fill: ${theme.color};
    }
    & .gt-ico-github svg {
      fill: #333;
    }
    & .gt-btn {
      background-color: ${theme.color};
      border-color: ${theme.color};
    }
    & .gt-header-controls-tip {
      display: none;
    }
    & .gt-btn-preview {
      color: ${theme.color};
      border-color: ${theme.color};
      background-color: #fff;

      &:hover {
        border-color: ${theme.color};
      }
    }
    & .gt-comment-admin .gt-comment-content {
      background-color: #fff;
    }
    & .gt-comment-content {
      background-color: #fff;

      &:hover {
        box-shadow: none;
      }
    }
    & .email-hidden-toggle {
      display: none;
    }
    & .email-hidden-reply {
      display: none;
    }
    & .gt-popup .gt-action.is--active:before {
      background: ${theme.color};
    }
  }
`;

const Comment: React.SFC<ICommentProps> = (props) => {
  const { issueNumber } = props;

  React.useEffect(() => {
    const gitalk = new Gitalk({
      clientID: process.env.GITALK_CLIENT_ID,
      clientSecret: process.env.GITALK_CLIENT_SECRET,
      repo,
      owner,
      admin: [owner],
      id: location.pathname,
      number: issueNumber,
      distractionFreeMode: false,
    });
    gitalk.render('comment');
  }, []);

  return <GitalkContainer id="comment" />;
};

export default Comment;
