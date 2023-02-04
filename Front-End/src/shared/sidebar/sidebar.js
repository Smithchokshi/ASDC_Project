import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Layout, Menu, Table, Button, Dropdown, Switch } from 'antd';
import ScrollAnimation from 'react-animate-on-scroll';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useStore, useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

function onChange(checked) {
  // console.log(`switch to ${checked}`);
}

const Sidebar = () => {
  const history = useHistory();
  const [iscollapsed, setIscollapsed] = useState(false);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
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

  const showModal = () => {
    setIscollapsed(true);
  };
  const raceMenu = (
    <Menu>
      <Menu.Item>
        <a rel="noopener noreferrer" href="/edit-profile">
          Edit Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="/change-password" rel="noopener noreferrer">
          Change Password
        </a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" href="/login">
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Sider
      // breakpoint="xxl"
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
      <div className="logo sidebar-top full-width">
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
          <img className="sidebar-logo" src="images/top-logo.svg" alt="logo" />
        </Link>
        <div className="full-width profile-section sidebar-profile-section flex-center">
          <div className="my-profile-menu">
            <div id="profile_dd" className="default-dropdown top-arrow">
              <Dropdown
                overlay={raceMenu}
                placement="bottomLeft"
                getPopupContainer={() => document.getElementById('profile_dd')}
              >
                <Button className="race">
                  <i className="fa fa-angle-down" aria-hidden="true" />
                </Button>
              </Dropdown>
            </div>
          </div>
          <div className="title">{user?.data?.fullName}</div>
          <div className="profile-image">
            <img src={user?.data?.avatarUrl} alt="" style={{ borderRadius: '50%' }} />
          </div>
        </div>
      </div>
      <Menu mode="inline" selectedKeys={[sidebarKey]} onClick={e => handleChange(e)}>
        <Menu.Item key={sidebarKey === '/' ? '/' : '/dashboard'}>
          {/* <ScrollAnimation animateOnce className="full-width" animateIn="fadeInLeft" delay={500}> */}
          <Link to="/dashboard">
            <img className="not-hover-show" src="images/sidebar-dashboard-icon.svg" alt="" />
            <img className="hover-show" src="images/sidebar-dashboard-hover-icon.svg" alt="" />
            {t('Dashboard')}
            <i className="fa fa-angle-right" aria-hidden="true" />
          </Link>
          {/* </ScrollAnimation> */}
        </Menu.Item>
        <Menu.Item className="mobile-profile-menu">
          <Link to="/" className="profile-mobile-icon">
            <img className="not-hover-show" src="images/sidebar-profile-icon.svg" alt="" />
            <img className="hover-show" src="images/sidebar-profile-hover-icon.svg" alt="" />
            <i className="fa fa-angle-right" aria-hidden="true" />
          </Link>
          <SubMenu key="7" title={t('Profile')}>
            <Menu.ItemGroup>
              <Menu.Item key="1">
                <Link to="/edit-profile">{t('Edit_profile')}</Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
        </Menu.Item>
        <Menu.Item key="/edit-profile" className="mobile-hide">
          {/* <ScrollAnimation animateOnce className="full-width" animateIn="fadeInLeft" delay={2100}> */}
          <Link to="/edit-profile">
            <img className="not-hover-show" src="images/sidebar-profile-icon.svg" alt="" />
            <img className="hover-show" src="images/sidebar-profile-hover-icon.svg" alt="" />
            {t('Profile')}
            <i className="fa fa-angle-right" aria-hidden="true" />
          </Link>
          {/* </ScrollAnimation> */}
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
