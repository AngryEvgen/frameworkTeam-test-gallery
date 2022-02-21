import axios from 'axios';
import { config } from '../config';

export const service = axios.create({
  baseURL: config.baseApiURL,
  timeout: 5000,
});
