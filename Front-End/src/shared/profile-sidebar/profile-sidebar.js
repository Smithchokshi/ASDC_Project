import React, { Component, useState } from 'react';
import { Switch } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { logout } from '../../redux/actions/authActions';

const S3BucketURL = process.env.REACT_APP_AWS_PATH;

function onChange(checked) {
  // console.log(`switch to ${checked}`);
}

const ProfileSidebar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [errors, setErrors] = useState({});

  const handleLogout = async () => {
    const res = await dispatch(logout());
    if (res) {
      history.push('/login');
    }
  };

  return (
    <ul>
      <li>
        <Link
          to="/edit-profile"
          className={history.location.pathname === '/edit-profile' ? 'active' : ''}
        >
          <span className="icon">
            <img src="images/edit-pen.svg" alt="" />
          </span>
          {t('Edit_profile')}
          <i className="fa fa-angle-right" aria-hidden="true" />
        </Link>
      </li>
    </ul>
  );
};

export default ProfileSidebar;
