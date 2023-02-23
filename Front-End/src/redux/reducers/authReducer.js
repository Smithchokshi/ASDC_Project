const initialState = {
   // isAuthenticated: false,
  // token: null,
  isAuthenticated: true,
  token: "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoic203MTQ0ODZAZGFsLmNhIiwiZXhwIjoxNjc3MTE4MDQ3LCJpYXQiOjE2NzcxMTQ0NDcsInNjb3BlIjoiIn0.D1XF-P9ryEyUSuWkmdYgQuuRuz4Xu70vM4yQe3j5ctQ",
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
