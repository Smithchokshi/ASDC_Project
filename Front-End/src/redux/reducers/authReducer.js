const initialState = {
  isAuthenticated: true,
  token: "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoic21pdGhUZXN0IiwiZXhwIjoxNjc2OTQ2NDY1LCJpYXQiOjE2NzY5NDI4NjUsInNjb3BlIjoiIn0.sE9EUYJjpGxC0XIT5gXfX4EZi3b2l28Gp7g5d_HQZ2Y",
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
