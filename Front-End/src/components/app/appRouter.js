import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Loader from '../../shared/loader/Loader';
import Sidebar from '../../shared/sidebar/sidebar';
import TopHeader from '../../shared/top-header/top-header';

const Dashboard = lazy(() => import('../dashboard/dashboard'));
const EditProfile = lazy(() => import('../edit-profile/edit-profile'));
const ErrorPage = lazy(() => import('../../shared/404/error-page'));

const Routing = () => {
  const PrivateRoutes = [
    {
      exact: true,
      path: '/',
      component: () => <Dashboard />,
      title: 'Dashboard',
    },
    {
      exact: true,
      path: '/dashboard',
      component: () => <Dashboard />,
      title: 'Dashboard',
    },
    {
      exact: true,
      path: '/edit-profile',
      component: () => <EditProfile />,
      title: 'Edit Profile',
    },
    {
      exact: true,
      path: '*',
      component: () => <ErrorPage />,
    },
  ].filter(cur => cur);

  return (
    <Suspense className="loader" fallback={<Loader />}>
      <Layout className="main-pages full-width">
        <Sidebar />
        <Switch>
          {PrivateRoutes.map(route => (
            <Route
              exact={route.exact !== false}
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))}
          <Redirect from="/" to="/404" />
        </Switch>
      </Layout>
    </Suspense>
  );
};

export default Routing;
