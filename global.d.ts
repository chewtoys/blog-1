declare interface IGithubIssue {
  number: number;
  title: string;
  labels: {
    id: number;
    name: string;
    color: string;
  }[];
  user: {
    id: number;
    login: string;
    avatar_url: string;
  }[];
  body: string;
  created_at: string;
  updated_at: string;
};

declare interface IPost {
  number: number;
  title: string;
  tags: string[];
  body: string;
  created_at: string;
  updated_at: string;
};
