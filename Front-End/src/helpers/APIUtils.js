import axios from 'axios';
import { encode as base64_encode } from 'base-64';
import { notification } from 'antd';
import store from '../redux/store';
import { logout } from '../redux/actions/authActions';

const TOKEN_NAME = process.env.REACT_APP_TOKEN_NAME;

class ApiUtils {
  constructor(message = false, request = true, appendAuth = true, response = true) {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_PATH,
    });

    if (request) {
      this.axios.interceptors.request.use(
        config => {
          const myConfig = { ...config };
          if (appendAuth) {
            const { auth } = store.getState();
            if (auth.isAuthenticated) myConfig.headers.Authorization = `Bearer ${auth.token}`;
            else myConfig.headers.Authorization = `Basic ${base64_encode('sm714486@dal.ca:12345')}`;
          }
          console.debug('Request', config);
          return myConfig;
        },
        error => {
          console.debug('Request Error', error);
          console.debug('Request Failed', error.request.data.message);
          return Promise.reject(error);
        }
      );
    }

    if (response) {
      this.axios.interceptors.response.use(
        config => {
          const myConfig = { ...config };
          console.debug('Response', myConfig);
          if (message) {
            notification.success({
              message: 'Success',
              description: myConfig.data.message,
            });
          }
          return myConfig;
        },
        error => {
          if (error.response.data.status === 401 || error.response.data.status === 403) {
            const { auth } = store.getState();
            notification.error({
              message: 'Error',
              description: error.response.data.message,
            });
            localStorage.removeItem(TOKEN_NAME);
            if (auth.token) {
              store.dispatch(logout());
              setTimeout(() => window.location.assign('/login'), 1000);
            }
          } else {
            console.debug('3');
            notification.error({
              message: 'Error',
              description: error.response.data.message,
            });
          }
          console.debug('Response Error', error);
          console.debug('Response Error', error.response.data.status);
          return Promise.reject(error);
        }
      );
    }
  }

  loadUser = (data, headers) =>
    this.axios({
      method: 'POST',
      url: '/profile/me',
      // FOR LOCAL url: '/api/users/:id' ( dont forget to change response in loadUser )
      data,
      headers,
    });

  register = data =>
    this.axios({
      method: 'POST',
      url: '/user/save',
      data,
    });

  login = ({ username, password }) =>
    this.axios({
      method: 'GET',
      url: '/user/login',
      username,
      password,
    });

  getDashboard = data =>
    this.axios({
      method: 'GET',
      url: '/connection/getAll/1',
      data,
    });

  addDBConfig = data =>
    this.axios({
      method: 'POST',
      url: '/connection/save',
      data,
    });

  editDBConfig = data =>
    this.axios({
      method: 'POST',
      url: '/connection/edit',
      data,
    });

  testDBConfig = data =>
    this.axios({
      method: 'POST',
      url: '/connection/test',
      data,
    });
}

export default ApiUtils;
