import React from 'react';
import * as next from 'next';
import _ from 'lodash/fp';
import Octokit from '@octokit/rest';

import { convertIssueToPost } from '../../utils/convert';
import { OWNER, REPO, DEFAULT_PER_PAGE } from '../../consts';

const octokit = new Octokit();

const IndexPage = (props: any) => {
  console.log(props);
  return (
    <div>
      <h1>Index</h1>
    </div>
  );
};

IndexPage.getInitialProps = async (ctx: next.NextContext) => {
  const page: number = _.toNumber(ctx.query.page) || 1;
  const per_page: number = _.toNumber(ctx.query.per_page) || DEFAULT_PER_PAGE;

  const res = await octokit.issues.listForRepo({
    owner: OWNER,
    repo: REPO,
    creator: OWNER,
    page,
    per_page,
  });
  // TODO: error handle
  const posts = _.map(convertIssueToPost, res.data);

  return {
    posts,
    page,
  };
};

export default IndexPage;
