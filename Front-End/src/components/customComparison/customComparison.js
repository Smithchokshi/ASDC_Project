import React, { useState, useEffect } from 'react';
import { Button, Input, Layout } from 'antd';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// import ScrollAnimation from 'react-animate-on-scroll';
// import { DeleteOutlined } from '@ant-design/icons';
// import useSimpleReactValidator from '../../shared/hooks/useSimpleReactValidator';
import { PlusOutlined } from '@ant-design/icons';
import ScrollAnimation from 'react-animate-on-scroll';
import { FormMain } from '../authentication/authentication-style';
import ApiUtils from '../../helpers/APIUtils';
import TopHeader from '../../shared/top-header/top-header';

const api = msg => new ApiUtils(msg);

const { Content } = Layout;

const AddVisulization = () => {
  // const history = useHistory();
  const location = useLocation();
  const { userId } = useSelector(state => state.auth.user);

  const fields = {
    userId: userId.toString(),
    link: false,
  };
  // const [errors, setErrors] = useState({});
  const [name, setName] = useState(null);
  const [allData, setAllData] = useState([]);
  const payloadObject = {
    dashboardId: window.location.pathname.split('/')[2],
  };

  // const [validator, showValidationMessage] = useSimpleReactValidator({}, {});

  const handleAllData = values => {
    if (values.length === 0) {
      const tempData = [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        },
      ];

      setAllData(tempData);
    } else setAllData(values);
  };

  const getData = async () => {
    try {
      const res = await api().getCustomDashboardByID(payloadObject.dashboardId);

      setName(res?.data?.data?.name);
      handleAllData(res?.data?.data?.values);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <React.Fragment>
        <TopHeader title={location.state.name} link={fields?.link} name={location.state.name} />
        <Content>
          <div>
            <div className="site-layout-background">
              <div className="top-boxes full-width">
                <FormMain className="global-form full-width add-graph-form">
                  <div className="full-width form-field">
                    <div className="label">Name</div>
                    <Input
                      placeholder="Name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      style={{ width: '50%' }}
                      // classname={errors?.name ? 'invalid' : ''}
                    />
                    {/* {validator.message(`Name`, name, `required`)} */}
                  </div>

                  <div className="full-width form-field flex-center mb-0">
                    <Button
                      type="primary"
                      className="submit-btn"
                      // onClick={e => submit(e, 'create')}
                      // loading={isSubmitLoading}
                    >
                      <span>Save</span>
                    </Button>
                  </div>
                </FormMain>
              </div>
            </div>

            <div className="site-layout-background">
              <div className="top-boxes full-width">
                {allData.length > 0 &&
                  allData.map((element, index) => (
                    <ScrollAnimation
                      animateOnce
                      className="full-width single-box graph-box"
                      animateIn="fadeInUp"
                      delay={index * 300}
                      style={{ width: '40%' }}
                    >
                      <div
                        className="full-width"
                        key={element.dashboardId}
                        role="presentation"
                        // onClick={() => handleModel(true, 'redirect', element)}
                      >
                        <div>
                          <PlusOutlined className="plus-icon" />
                        </div>
                      </div>
                    </ScrollAnimation>
                  ))}
              </div>
            </div>
          </div>
        </Content>
      </React.Fragment>
    </Layout>
  );
};

export default AddVisulization;
