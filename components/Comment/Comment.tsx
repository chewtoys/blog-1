import * as React from 'react';
import styled from 'styled-components';
import Gitalk from 'gitalk';
import 'gitalk/dist/gitalk.css';

import config, { themeColor } from '../../config.json';

interface ICommentProps {
  id: number;
}

const GitalkContainer = styled.div`
  & .gt-container {
    & a {
      color: ${themeColor};
      box-shadow: none;
      border-bottom: none;
    }
    & svg {
      fill: ${themeColor};
    }
    & .gt-ico-github svg {
      fill: #333;
    }
    & .gt-btn {
      background-color: ${themeColor};
      border-color: ${themeColor};
    }
    & .gt-btn-preview {
      color: ${themeColor};
      border-color: ${themeColor};
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
      background: ${themeColor};
    }
  }
`;

const Comment: React.SFC<ICommentProps> = (props) => {
  const { id } = props;

  React.useEffect(() => {
    const gitalk = new Gitalk({
      clientID: config.gitalk.clientID,
      clientSecret: config.gitalk.clientSecret,
      repo: config.repo,
      owner: config.owner,
      admin: [config.owner],
      id: location.pathname,
      number: id,
      distractionFreeMode: false,
    });
    gitalk.render('comment');
  }, []);

  return <GitalkContainer id="comment" />;
};

export default Comment;
