import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Dropdown, Button, Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';

const { Header } = Layout;

const TopHeader = ({ title }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = async () => {
    const res = await dispatch(logout());
  };

  const items = [
    {
      key: '1',
      label: (
        <Link to="/login" onClick={() => handleLogout()}>
          Logout
        </Link>
      ),
    },
  ];

  return (
    <Header className="site-layout-sub-header-background page-top-section full-width flex-center">
      <h2>{title}</h2>

      <div className="flex-center topbar-switch">
        <Dropdown menu={{ items }} placement="bottomLeft">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a role="presentation" onClick={e => e.preventDefault()}>
            <Space>
              <div className="title">Smith</div>
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Header>
  );
};

TopHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TopHeader;
