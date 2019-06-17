interface IGithubLabel {
  id: number;
  url: string;
  name: string;
  color: string;
}

interface IGithubIssue {
  number: number;
  title: string;
  labels: IGithubLabel[];
  body: string;
  created_at: string;
  updated_at: string;
  comments: number;
}

interface IGithubRepo {
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  description: string;
  open_issues_count: number;
}

interface IBlogInfo {
  user: {
    name: string;
    avatar: string;
    url: string;
  };
  description: string;
  posts_count: number;
  tags_count?: number;
}

interface IBlogPost {
  slug: string;
  title: string;
  body: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  comments: number;
}

interface IPageContextValue {
  recommend: IBlogPost[];
  tags: string[];
}
