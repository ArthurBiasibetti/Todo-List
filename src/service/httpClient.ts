import axios from 'axios';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

const axiosConfig = axios.create({
  baseURL: 'https://trainees-2022-todo-api-week-3.herokuapp.com',
  timeout: 30000,
  headers: defaultHeaders
});

class HttpClient {
  static api = axiosConfig;
}

export default HttpClient;