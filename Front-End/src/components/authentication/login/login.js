import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Checkbox, Switch } from 'antd';
import ScrollAnimation from 'react-animate-on-scroll';
import useSimpleReactValidator from '../../../shared/hooks/useSimpleReactValidator';
import { loadUser, login } from '../../../redux/actions/authActions';
import { AuthenticationManin, FormMain } from '../authentication-style';

const settings = {
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: false,
  dots: false,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5500,
  fade: true,
  cssEase: 'linear',
};

const Login = () => {
  const [errors, setErrors] = useState({});
  const { t, i18n } = useTranslation();
  const [fields, setFields] = useState({});
  const [notification, setNotification] = useState({});
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [checked, setChecked] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  const dummy = [
    {
      key: '1',
      image: `/images/DataWiz-Tab-Title-logo.png`,
    },
  ];

  const [validator, showValidationMessage] = useSimpleReactValidator({
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

  const handleChange = (field, value) => {
    setFields(prev => ({
      ...prev,
      [field]: value.target.value.trim() === '' ? '' : value.target.value.trim(),
    }));
  };

  const submit = async e => {
    e.preventDefault();
    if (validator.allValid()) {
      setIsSubmitLoading(true);
      const data = {
        username: fields?.email,
        password: fields?.password,
      };
      const res = await dispatch(login(data));
      console.log('res', res);
      if (res) {
        setIsSubmitLoading(false);
        history.push('/');
      } else {
        setFields(prev => ({
          ...prev,
          password: null,
        }));
      }
      setIsSubmitLoading(false);
    } else {
      setIsSubmitLoading(false);
      setErrors(validator.getErrorMessages());
      // simpleValidator.current.showMessages();
      showValidationMessage(true);
    }
  };

  return (
    <AuthenticationManin className="full-width">
      <div className="left-auth">
        <Slider {...settings}>
          {dummy.map(element => (
            <div className="full-width" key={element.key}>
              <div
                className="full-width slide-image bgimg-main"
                style={{ backgroundImage: `url(${element.image})` }}
              />
            </div>
          ))}
        </Slider>

        <div className="title-section full-width">
          <ScrollAnimation animateOnce className="full-width" animateIn="fadeInLeft" delay={500}>
            <div className="full-width auth-top-logo mobile-show">
              <Link to="/">
                <img className="" src="images/DataWiz-logo.png" alt="logo" />
              </Link>
            </div>
            <h1>{t('Lets_Connect_us')}</h1>
            {t('Lorem')}
          </ScrollAnimation>
        </div>
      </div>
      <div className="right-auth large-screen-height-center single-section">
        <div className="full-width right-auth-inner">
          <ScrollAnimation animateOnce className="full-width" animateIn="fadeIn" delay={500}>
            <div className="full-width auth-top-logo desktop-show">
              <Link to="/">
                {/* <ScrollAnimation
                animateOnce
                className="full-width"
                animateIn="fadeInLeft"
                delay={200}
              > */}
                <img className="" src="images/DataWiz-logo.png" alt="logo" />
                {/* </ScrollAnimation> */}
              </Link>
            </div>

            <div className="full-width left-right-auth">
              <div className="right-auth-right">
                <div className="full-width flex-center my-lang-switch">
                  <h2 className="auth-head full-width">{t('Login')}</h2>
                </div>
                <div className="full-width auth-subtitle border">
                  <h6>{t('Login_to_your_account')}</h6>
                  {t('Enter_your_email_and_password_to_connect')}
                  <br /> {t('with_Jail_connect')}
                </div>
                <FormMain onSubmit={submit} className="global-form full-width">
                  {/* Email */}
                  <div className="full-width form-field">
                    <div className="label">{t('Email_address')}</div>
                    <Input
                      type="text"
                      value={fields?.email}
                      onChange={e => handleChange('email', e)}
                      placeholder={t('Email_address')}
                      className={errors?.email ? 'invalid' : ''}
                    />
                    {validator.message(t('Email_address'), fields?.email, `required|email`, {
                      messages: { email: t('Email_Validation') },
                    })}
                  </div>

                  {/* password */}
                  <div className="full-width form-field">
                    <div className="label">{t('Password')}</div>
                    <Input.Password
                      type="text"
                      placeholder={t('Password')}
                      value={fields?.password}
                      onChange={e => handleChange('password', e)}
                      className={errors?.password ? 'invalid' : ''}
                    />
                    {validator.message(t('Password'), fields?.password, 'required')}
                  </div>
                  <div className="full-width form-field text-checkbox top-margin flex-center">
                    <Checkbox onChange={e => setChecked(e.target.checked)} checked={checked}>
                      {t('Remember_me')}
                    </Checkbox>
                    <Link className="recovery-text" to="/forgot-password">
                      {t('Forgot_password')}?
                    </Link>
                  </div>
                  <div className="full-width form-field flex-center">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="submit-btn full-width"
                      loading={isSubmitLoading}
                    >
                      <span>{t('Login')}</span>
                    </Button>
                  </div>
                </FormMain>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </AuthenticationManin>
  );
};

export default Login;
