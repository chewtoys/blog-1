import axios from 'axios';
import { GITHUB_ISSUE_URL } from '../consts';

export interface IGithubIssue {
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

export default {
  getIssues: async (page: number, per_page: number): Promise<IGithubIssue[]> => {
    const params = { page, per_page };
    const res = await axios.get(GITHUB_ISSUE_URL, { params });
    const { status, statusText, data } = res;
    if (status !== 200) {
      throw new Error(statusText);
    }
    return data;
  }
}
