import ApiUtils from '../../helpers/APIUtils';

const api = new ApiUtils();

const TOKEN_NAME = process.env.REACT_APP_TOKEN_NAME;

export const loadUser = () => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('id_token');
    const username = localStorage.getItem('username');

    if (!token) return dispatch({ type: 'NEW_USER' });

    const res = await api.loadUser( username , { Authorization: `Bearer ${token}` });

    console.log('res',res);

    dispatch({
      type: 'EXISTING_USER',
      payload: {
        userId: res.data.data
      },
      token,
    });

    return true;
  } catch (err) {
    dispatch({ type: 'AUTH_FAILED' });
    return false;
  }
};

export const login = data => async dispatch => {
  try {
    const res = await api.login(data);
    // after successfully login, you will get token on it
    localStorage.setItem('id_token', res?.data?.data);

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
    localStorage.removeItem(TOKEN_NAME);
    dispatch({ type: 'LOGOUT' });

    return true;
  } catch (err) {
    return false;
  }
};
