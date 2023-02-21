import ApiUtils from '../../helpers/APIUtils';

const api = new ApiUtils();

const TOKEN_NAME = process.env.REACT_APP_TOKEN_NAME;

export const loadUser = () => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('id_token');

    if (!token) return dispatch({ type: 'NEW_USER' });

    const res = await api.loadUser(
      {
        platform: 1,
      },
      { Authorization: `Bearer ${token}` }
    );

    dispatch({
      type: 'EXISTING_USER',
      payload: res.data,
      token,
    });

    return true;
  } catch (err) {
    dispatch({ type: 'AUTH_FAILED' });
    return false;
  }
};

export const changeLanguage = data => async dispatch => {
  try {
    dispatch({
      type: 'CHANGE_LANGUAGE',
      payload: data,
    });
    localStorage.setItem('language', data);
    return true;
  } catch (err) {
    // console.log('CATCH ERROR', err);
    return false;
  }
};

export const login = data => async dispatch => {
  try {
    const regi = {
      name: 'smith',
      username: 'smithTest',
      password: '12345'
    }
    const registerRes = await api.login(data);
    console.log(registerRes);
    // const res = await api.login(data);
    // after successfully login, you will get token on it
    localStorage.setItem('id_token', res?.data?.token);

    await dispatch(loadUser());
    dispatch({
      type: 'CHANGESIDEBAR',
      payload: '/',
    });

    return true;
  } catch (err) {
    // console.log('error');
    dispatch({ type: 'AUTH_FAILED' });
    return false;
  }
};

export const logout = () => async dispatch => {
  try {
    await api.logout();
    localStorage.removeItem(TOKEN_NAME);
    dispatch({ type: 'LOGOUT' });

    return true;
  } catch (err) {
    // console.log('CATCH ERROR', err);
    return false;
  }
};
