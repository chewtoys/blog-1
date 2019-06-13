interface GithubIssue {
  number: number;
  title: string;
  labels: Array<{name: string}>;
  body: string;
  created_at: string;
  updated_at: string;
  comments: number;
}

interface BlogPost {
  slug: string;
  title: string;
  body: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  comments: number;
}
