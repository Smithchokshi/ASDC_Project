import React, { useState, useEffect } from 'react';
import { Layout, Menu, Table, Button, Dropdown, Switch } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore, useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

const { Sider } = Layout;

const Sidebar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const dashboard = useSelector(state => state.dashboard.dashboardData);
  const sidebarKey = useSelector(state => state.auth.sidebarKey);

  const handleChange = e => {
    dispatch({
      type: 'CHANGESIDEBAR',
      payload: e?.key,
    });
  };

  const handleLogout = async () => {
    const res = await dispatch(logout());
    if (res) {
      history.push('/login');
    }
  };

  return (
    <Sider
      collapsible
      collapsedWidth="0"
      width="300"
      onBreakpoint={broken => {
        // console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        // console.log(collapsed, type);
      }}
      className="left-sidebar"
    >
      <div className="sidebar-top full-width">
        <Link
          to="/"
          role="presentation"
          onClick={() =>
            dispatch({
              type: 'CHANGESIDEBAR',
              payload: '/',
            })
          }
        >
          <img className="sidebar-logo" src="images/DataWiz-logo.svg" alt="logo" />
        </Link>
      </div>
      <Menu mode="inline" selectedKeys={[sidebarKey]} onClick={e => handleChange(e)}>
        <Menu.Item key={sidebarKey === '/' ? '/' : '/dashboard'}>
          <Link to="/dashboard">
            <img className="not-hover-show" src="images/sidebar-dashboard-icon.svg" alt="" />
            <img className="hover-show" src="images/sidebar-dashboard-hover-icon.svg" alt="" />
            Dashboard
            <i className="fa fa-angle-right" aria-hidden="true" />
          </Link>
        </Menu.Item>
      </Menu>
      {dashboard && dashboard.length > 0 && dashboard.map((data,index) => (
          <Menu mode="inline" selectedKeys={[sidebarKey]} onClick={e => handleChange(e)}>
            <Menu.Item key={data.id}>
              <Link to={`/database/${data.name}`}>
                <img className="not-hover-show" src="images/sidebar-dashboard-icon.svg" alt="" />
                <img className="hover-show" src="images/sidebar-dashboard-hover-icon.svg" alt="" />
                {data.name}
                <i className="fa fa-angle-right" aria-hidden="true" />
              </Link>
            </Menu.Item>
          </Menu>
      ))}

    </Sider>
  );
};

export default Sidebar;
