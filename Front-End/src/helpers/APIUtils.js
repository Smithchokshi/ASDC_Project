import axios from 'axios';
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
          const language = localStorage.getItem('i18nextLng');
          if (appendAuth) {
            const { auth } = store.getState();
            if (!myConfig.headers['Accept-Language'])
              myConfig.headers['Accept-Language'] = language;
            if (auth.isAuthenticated) myConfig.headers.Authorization = `Bearer ${auth.token}`;
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

  login = data =>
    this.axios({
      method: 'POST',
      url: '/auth/login',
      // FOR LOCAL url: '/api/users/:id' ( dont forget to change response in loadUser )
      data,
    });

  logout = () =>
    this.axios({
      method: 'POST',
      url: '/profile/logout',
    });

  verifyUser = data =>
    this.axios({
      method: 'PATCH',
      url: `/auth/verify-user/${data}`,
    });

  editProfile = data =>
    this.axios({
      method: 'PUT',
      url: `/profile/update`,
      data,
    });

  forgotPassword = data =>
    this.axios({
      method: 'POST',
      url: `/auth/forgot-password`,
      data,
    });

  resetPassword = ({ token, ...data }) =>
    this.axios({
      method: 'PATCH',
      url: `/auth/reset-password/${token}`,
      ...data,
    });

  changePassword = ({ ...data }) =>
    this.axios({
      method: 'PATCH',
      url: '/profile/change-password',
      ...data,
    });

  changeLanguage = ({ ...data }) =>
    this.axios({
      method: 'PATCH',
      url: '/profile/update/language',
      ...data,
    });

  getDashboard = data =>
    this.axios({
      method: 'GET',
      url: '/dashboard/lists',
      // FOR LOCAL url: '/api/users/:id' ( dont forget to change response in loadUser )
      data,
    });

  getTodaysEarning = ({ ...data }) =>
    this.axios({
      method: 'POST',
      url: '/orders/today-earnings',
      ...data,
    });

  getCategory = ({ ...data }) =>
    this.axios({
      method: 'POST',
      url: '/category/lists',
      ...data,
    });

  addCategory = ({ ...data }) =>
    this.axios({
      method: 'POST',
      url: '/category/create',
      ...data,
    });

  editCategory = ({ id, ...data }) =>
    this.axios({
      method: 'PUT',
      url: `/category/update/${id}`,
      ...data,
    });

  deleteCategory = ({ id }) =>
    this.axios({
      method: 'DELETE',
      url: `/category/delete/${id}`,
    });

  getAllProducts = ({ ...data }) =>
    this.axios({
      method: 'POST',
      url: '/product/lists',
      ...data,
    });

  appProduct = ({ ...data }) =>
    this.axios({
      method: 'POST',
      url: '/product/create',
      ...data,
    });

  editProduct = ({ id, ...data }) =>
    this.axios({
      method: 'PUT',
      url: `/product/update/${id}`,
      ...data,
    });

  deleteProduct = ({ id }) =>
    this.axios({
      method: 'DELETE',
      url: `/product/delete/${id}`,
    });

  getPrivacyPolicy = () =>
    this.axios({
      method: 'GET',
      url: `/static-page/privacy-policy`,
    });

  getAboutUs = () =>
    this.axios({
      method: 'GET',
      url: `/static-page/about-us`,
    });

  getTermsCondition = () =>
    this.axios({
      method: 'GET',
      url: `/static-page/terms-conditions`,
    });

  getAllOrders = ({ ...data }) =>
    this.axios({
      method: 'POST',
      url: `/orders/lists`,
      ...data,
    });

  getNotifications = ({ ...data }) =>
    this.axios({
      method: 'POST',
      url: `/notification/lists`,
      ...data,
    });
}

export default ApiUtils;
