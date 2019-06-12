import axios from 'axios';

import { SITE_URL } from '../config';

const LOCAL_API_URL = 'http://localhost:3000/api';
const ONLINE_API_URL = `${SITE_URL}/api`;
const API_URL = process.env.NODE_ENV !== 'production' ? LOCAL_API_URL : ONLINE_API_URL;

export const getPosts = (params: any = {}) => axios.get(`${API_URL}/posts`, { params });
