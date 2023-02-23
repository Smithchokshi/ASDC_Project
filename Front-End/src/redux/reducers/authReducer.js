const initialState = {
//   isAuthenticated: false,
//   token: null,
  isAuthenticated: true,
  token: "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoic21pdGhUZXN0IiwiZXhwIjoxNjc3MTE2NjEzLCJpYXQiOjE2NzcxMTMwMTMsInNjb3BlIjoiIn0.uhzpKCqNBlbqfeD4p_eejfIOo9XVJ98x1GP4ooOQfwo",
  user: {},
  language: 'en',
  sidebarKey: '/',
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
