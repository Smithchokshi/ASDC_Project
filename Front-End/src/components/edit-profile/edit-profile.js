import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ScrollAnimation from 'react-animate-on-scroll';
import { useTranslation, Trans } from 'react-i18next';
import {
  Input,
  Button,
  Checkbox,
  Modal,
  Upload,
  message,
  Select,
  Layout,
  Menu,
  Switch,
  notification,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import { useSelector, useDispatch } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import useSimpleReactValidator from '../../shared/hooks/useSimpleReactValidator';
import Sidebar from '../../shared/sidebar/sidebar';
import TopHeader from '../../shared/top-header/top-header';
import { AuthenticationManin, FormMain } from '../authentication/authentication-style';
import ProfileSidebar from '../../shared/profile-sidebar/profile-sidebar';
import { dummyRequest, getBase64 } from '../../helpers/utils';
import ApiUtils from '../../helpers/APIUtils';
import { loadUser } from '../../redux/actions/authActions';

const api = msg => new ApiUtils(msg);

const S3BucketURL = process.env.REACT_APP_AWS_PATH;

const { Option } = Select;
const { Content } = Layout;

const StyledIntlTelInput = styled(IntlTelInput)`
  width: 100% !important;
  margin-right: 0;
  height: 32px;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;

  > .intl-tel-input {
    width: 100% !important;
    margin-right: 0;
    height: 32px;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
  }

  .iti-flag {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  & input {
    width: 100% !important;

    height: 32px;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
  }

  & .form-control {
    border: 1px solid #e2e6ea;
    background-color: ${props => (props.theme.mode === 'dark' ? '#020e18' : '#f8f8f8')};
    color: ${props => (props.theme.mode === 'dark' ? 'white' : '')};
    border-radius: 5px;
    min-height: 45px;
    width: 100%;
    padding-left: 5px;
  }
`;

const PhoneDiv = styled.div`
  > .intl-tel-input {
    width: 100%;
  }
  & .form-control {
    width: 100% !important;
    height: 32px;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
  }
`;

const EditProfile = () => {
  const { t, i18n } = useTranslation();
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState();
  const [imageUrl, setimageUrl] = useState(user?.data?.avatarUrl);
  const [fields, setFields] = useState(user?.data);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  const [validator, setSimpleValidator] = useSimpleReactValidator({
    validators: {
      password: {
        message:
          'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
        rule: val => {
          const patt = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          return patt.test(val);
        },
      },
      matchPassword: {
        message: 'New password & Confirm password does not match',
        rule: val => {
          if (fields.password === val) {
            return true;
          }
          return false;
        },
      },
    },
  });

  const changeOfCode = (a, b, c, d) => {
    const newFields = { ...fields };
    newFields.country_code = `+${b.dialCode}`;
    newFields.countryIsoCode = `${b.iso2}`;
    newFields.phone = a;
    setFields(newFields);
  };

  const _changeNumber = (a, mob, code) => {
    const newFields = { ...fields };
    newFields.country_code = `+${code.dialCode}`;
    newFields.phone = mob;

    setFields(newFields);
  };

  const handleChange = field => e => {
    setFields(prev => ({
      ...prev,
      [field]: e.target.value.trim() === '' ? '' : e.target.value,
    }));
  };

  const handleChangeSelect = field => e => {
    setFields(prev => ({
      ...prev,
      [field]: e,
    }));
  };

  const submit = async e => {
    e.preventDefault();

    if (validator.allValid()) {
      setIsSubmitLoading(true);
      const formData = new FormData();
      // console.log(fields);
      formData.append('firstName', fields.firstName);
      formData.append('lastName', fields.lastName);
      if (file) formData.append('avatar', file);
      formData.append('mobile', fields.phone);
      formData.append('countryCode', fields.country_code);
      formData.append('countryIsoCode', fields.countryIsoCode);
      try {
        const data = await api(true).editProfile(formData);
        if (data) {
          dispatch({
            type: 'CHANGESIDEBAR',
            payload: '/dashboard',
          });
          history.push('/dashboard');
          await dispatch(loadUser());
          setIsSubmitLoading(false);
          setForceUpdate(!forceUpdate);
        }
      } catch {
        setIsSubmitLoading(false);
      }
    } else {
      setErrors(validator.getErrorMessages());
      // simpleValidator.current.showMessages();
      setSimpleValidator(true);
    }
  };

  const handleChangeFile = info => {
    if (
      (info.file.type === 'image/png' ||
        info.file.type === 'image/jpg' ||
        info.file.type === 'image/jpeg') &&
      info.file.size / 1024 / 1024 < 2
    ) {
      getBase64(info.file)
        .then(data => setimageUrl(data))
        .catch(e => console.log(e));
      setFile(info.file);
    } else {
      notification.error({
        message: 'Error',
        description: `${
          info.file.size / 1024 / 1024 > 2
            ? 'Please upload file less than 2 MB'
            : 'Please upload a valid image file'
        }`,
      });
    }
  };

  return (
    <Layout>
      <TopHeader title={t('Edit_profile')} />
      <Content className="profile-left-right-main">
        <div className="profile-left">
          <ProfileSidebar />
        </div>
        <div className="profile-right">
          <ScrollAnimation
            animateOnce
            className="full-width single-box"
            animateIn="fadeIn"
            delay={300}
          >
            <div className="full-width auth-subtitle border">
              <h6>{t('Edit_profile')}</h6>
              {/* Enter your email and password to connect
              <br /> with Jail connect */}
            </div>
            <FormMain onSubmit={submit} className="global-form full-width">
              <div className="full-width form-field image-upload-section text-center edit-image">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  accept="image/jpg, image/png, image/jpeg"
                  className="avatar-uploader edit-profile image-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload
                  customRequest={dummyRequest}
                  onChange={handleChangeFile}
                >
                  <img
                    src={imageUrl || `${S3BucketURL}commissary/camera-icon.svg`}
                    alt="avatar"
                    style={{ width: '100%' }}
                  />
                  <i className="fa fa-pencil" aria-hidden="true" />
                </Upload>
              </div>

              <div className="half-form-field full-width">
                {/* First Name */}
                <div className="full-width form-field">
                  <div className="label">{t('First_Name')}</div>
                  <Input
                    placeholder={t('First_Name')}
                    value={fields.firstName}
                    onChange={handleChange('firstName')}
                    className={errors.firstName ? 'invalid' : ''}
                  />
                  {validator.message(`${t('First_Name')}`, fields.firstName, 'required')}
                </div>

                {/* Last Name */}

                <div className="full-width form-field">
                  <div className="label">{t('Last_Name')}</div>
                  <Input
                    placeholder={t('Last_Name')}
                    value={fields.lastName}
                    onChange={handleChange('lastName')}
                    className={errors.lastName ? 'invalid' : ''}
                  />
                  {validator.message(`${t('Last_Name')}`, fields.lastName, 'required')}
                </div>
              </div>
              <div className="half-form-field full-width">
                {/* Phone Number */}
                <div className="full-width form-field">
                  <div className="label">{t('Phone_Number')}</div>
                  <PhoneDiv className="phone-field full-width" style={{ width: '100%' }}>
                    <StyledIntlTelInput
                      allowDropdown
                      separateDialCode
                      formatOnInit={false}
                      inputClassName="form-control"
                      defaultValue=""
                      placeholder={t('Phone_Number')}
                      value={fields?.phone}
                      preferredCountries={[fields?.countryIsoCode || 'in']}
                      onSelectFlag={(a, b, c, d) => changeOfCode(a, b, c, d)}
                      onPhoneNumberChange={(a, b, c) => _changeNumber(a, b, c)}
                      css={['intl-tel-input', 'form-control']}
                    />
                  </PhoneDiv>
                  {validator.message(
                    `${t('Phone_Number')}`,
                    fields.phone,
                    'required|numeric|min:7|max:15'
                  )}
                </div>
                {/* Email */}
                <div className="full-width form-field">
                  <div className="label">{t('Email_address')}</div>
                  <Input
                    disabled
                    type="email"
                    value={fields.email}
                    onChange={() => handleChange('email')}
                    placeholder={t('Email_address')}
                    className={errors.email ? 'invalid' : ''}
                  />
                </div>
              </div>

              <div className="full-width form-field flex-center mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="submit-btn"
                  loading={isSubmitLoading}
                >
                  <span>{t('save')}</span>
                </Button>
              </div>
            </FormMain>
          </ScrollAnimation>
        </div>
      </Content>
    </Layout>
  );
};

export default EditProfile;
