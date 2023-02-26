const initialState = {
  isAuthenticated: false,
  token: null,
  user: {},
  language: 'en',
  sidebarKey:
    window.location.pathname.split('/').length > 2
      ? window.location.pathname.split('/')[2]
      : window.location.pathname,
};

const AuthReducer = (state = initialState, action) => {
  const { type, payload, token } = action;

  switch (type) {
    case 'EXISTING_USER':
      return {
        ...state,
        isAuthenticated: true,
        token,
        user: payload,
      };
    case 'CHANGESIDEBAR':
      return {
        ...state,
        sidebarKey: payload,
      };
    case 'NEW_USER':
    case 'AUTH_FAILED':
      return initialState;
    default:
      return state;
  }
};

export default AuthReducer;
