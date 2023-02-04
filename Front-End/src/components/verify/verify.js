import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Result } from 'antd';
import Loader from '../../shared/loader/Loader';
import ApiUtils from '../../helpers/APIUtils';

const api = msg => new ApiUtils(msg);

const Verify = () => {
  const { search } = useLocation();
  const token = new URLSearchParams(search).get('token');
  // const { token } = useParams();
  // console.log(token);
  const history = useHistory();
  // console.log(history);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState({});

  const verifyApiCall = async () => {
    setLoader(true);
    try {
      await api(false).verifyUser(token);
      setLoader(false);
      setMessage({
        status: 'success',
        title: 'User has been successfully verified',
        subTitle: 'Redirecting you in few seconds...',
      });
      setTimeout(() => {
        history.push('/login');
      }, 3000);
    } catch (e) {
      setLoader(false);
      setMessage({
        status: 'error',
        title: 'Unfortunately, user was not verified',
        subTitle: 'Redirecting you in few seconds...',
      });
      setTimeout(() => {
        history.push('/login');
      }, 3000);
    }
  };

  useEffect(() => {
    verifyApiCall();
  }, []);

  return (
    <Fragment>
      {loader ? (
        <span className="loader-class">
          <Loader />
        </span>
      ) : (
        <Result
          className="result"
          style={{ color: 'white' }}
          status={message?.status}
          title={message?.title}
          subTitle={message?.subTitle}
        />
      )}
    </Fragment>
  );
};

export default Verify;
