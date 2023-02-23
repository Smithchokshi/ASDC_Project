import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

const { Header } = Layout;

const TopHeader = ({ title }) => {

  return (
    <Header className="site-layout-sub-header-background page-top-section full-width flex-center">
      <h2>{title}</h2>
    </Header>
  );
};

TopHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TopHeader;
