import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';

const { Header } = Layout;

const TopHeader = ({ title }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
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
          <a role="presentation" onClick={e => e.preventDefault()}>
            <Space>
              <div className="title">Smith</div>
              <DownOutlined style={{ color: '#2b2836' }} />
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
