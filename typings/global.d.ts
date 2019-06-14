interface GithubLabel {
  id: number;
  url: string;
  name: string;
  color: string;
}

interface GithubIssue {
  number: number;
  title: string;
  labels: GithubLabel[];
  body: string;
  created_at: string;
  updated_at: string;
  comments: number;
}

interface BlogOwner {
  login: string;
  name: string;
  email: string;
  location: string;
  html_url: string;
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

interface PageContextValue {
  user: BlogOwner;
  recent: BlogPost[];
  tags: string[];
}

