import React from 'react';

import * as api from '../../lib/api';

const IndexPage = (props: any) => {
  console.log(props);
  return (
    <div>
      <h1>Index</h1>
    </div>
  );
};

IndexPage.getInitialProps = async () => {
  const res = await api.getPosts();
  const { data: posts } = res;
  return { posts };
};

export default IndexPage;
