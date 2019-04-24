import * as React from 'react';

import SearchInput from './SearchInput';
import SearchResult from './SearchResult';
import useQueryParam from '../../hooks/useQueryParam';
import useSearchResult from '../../hooks/useSearchResult';
import { getBrowserWindow } from '../../utils/helpers';

type ISearchProps = {
  posts: IMarkdownRemarkNode[];
};

const Search = (props: ISearchProps) => {
  const { posts } = props;
  const window =  getBrowserWindow();
  if (!window) {
    return null;
  }

  const [keyword = '', setKeyword] = useQueryParam(window.location, 'keyword');
  const result = useSearchResult(posts, keyword as string);

  return (
    <div>
      <SearchInput value={keyword as string} count={result.length} onChange={setKeyword} />
      <SearchResult dataSource={result} />
    </div>
  );
};

export default Search;
