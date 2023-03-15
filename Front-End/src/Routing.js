import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Redirect, Switch, useHistory } from 'react-router-dom';
import { useStore, useSelector } from 'react-redux';
import { Layout, Menu, Table, Button, Dropdown, Input, Space } from 'antd';
import Loader from './shared/loader/Loader';
import Sidebar from './shared/sidebar/sidebar';

const App = lazy(() => import('./components/app/appRouter'));
const LoginPage = lazy(() => import('./components/authentication/login/login'));
const RegisterPage = lazy(() => import('./components/authentication/register/register'));

const { Content } = Layout;

const Routing = () => {
  const history = useHistory();
  // const { isAuthenticated } = useStore().getState().auth;
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const PublicRoutes = [
    {
      exact: true,
      path: '/login',
      component: () => <LoginPage />,
    },
    {
      exact: true,
      path: '/signup',
      component: () => <RegisterPage />,
    },
  ];

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? <Redirect to="/dashboard" /> : <Component {...props} />
        }
      />
    );
  }

  return (
    // <BrowserRouter>
    <Suspense className="loader" fallback={<Loader />}>
      <Switch>
        {PublicRoutes.map(route => (
          <PublicRoute
            exact={route.exact}
            key={route.path}
            path={route.path}
            component={route.component}
          />
        ))}
        <PrivateRoute path="/">
          <App />
        </PrivateRoute>
      </Switch>
    </Suspense>
    // </BrowserRouter>
  );
};

export default Routing;
