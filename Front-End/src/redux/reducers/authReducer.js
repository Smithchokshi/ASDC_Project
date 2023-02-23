const initialState = {
  // isAuthenticated: false,
  // token: null,
  isAuthenticated: true,
  token: "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoic203MTQ0ODZAZGFsLmNhIiwiZXhwIjoxNjc3MTg0Mzk1LCJpYXQiOjE2NzcxODA3OTUsInNjb3BlIjoiIn0.jPqbuPbT2zKFrThQdft2751M9lhukeXH1zH3YfYZ7Cc",
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
