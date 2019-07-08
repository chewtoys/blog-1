interface IGithubPageInfo {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface IGithubLabel {
  name: string;
  issues: {
    totalCount: number;
  };
}

interface IGithubLabels {
  nodes: IGithubLabel[];
}

interface IGithubIssue {
  id: string;
  number: number;
  title: string;
  body: string;
  labels: IGithubLabels;
  createdAt: string;
  bodyHTML?: string;
}

interface IGithubIssues {
  nodes: IGithubIssue[];
  pageInfo: IGithubPageInfo;
}
