import React, { useState, useEffect } from 'react';
import { Layout, Menu, Table, Button, Dropdown, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ScrollAnimation from 'react-animate-on-scroll';
import Loader from '../../shared/loader/Loader';
import TopHeader from '../../shared/top-header/top-header';
import AddDBConfig from './addDBConfig';
import EditDBConfig from './editDBConfig';
import ApiUtils from '../../helpers/APIUtils';
import { storeDashboardData } from '../../redux/actions/dashboardActions';

const api = new ApiUtils();

const { Content } = Layout;

const Dashboard = () => {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);
  const [addModel, setAddModel] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [editData, setEditData] = useState({});
  const dashboardData = useSelector(state => state.dashboard.dashboardData);

  const handleLoader = bool => {
    setLoader(bool);
  };

  const handleModel = (bool, method, data) => {
    if (method === 'add') setAddModel(bool);
    if (method === 'edit') {
      setEditModel(bool);
      setEditData(data);
    }
  };

  const getData = async () => {
    handleLoader(true);
    try {
      const res = await dispatch(storeDashboardData());
      handleLoader(false);
    } catch (e) {
      handleLoader(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      {loader ? (
        <Loader />
      ) : (
        <React.Fragment>
          <TopHeader title="Dashboard" />
          <Content>
            <div>
              <div className="site-layout-background">
                <ScrollAnimation
                  animateOnce
                  className="full-width single-box"
                  animateIn="fadeIn"
                  delay={500}
                >
                  <div className="search-box full-width category-page date-calender-section calenderWidth large">
                    <div className="flex">
                      <Button className="reset-btn" onClick={() => handleModel(true, 'add', null)}>
                        {/*<img src={`${S3BucketURL}commissary/add-icon.svg`} alt="Add Category" />{' '}*/}
                        Add DB Config
                      </Button>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
              <div className="site-layout-background">
                <div className="top-boxes full-width">
                  {dashboardData &&
                    dashboardData.length > 0 &&
                    dashboardData.map((element, index) => (
                      <ScrollAnimation
                        animateOnce
                        className="full-width single-box"
                        animateIn="fadeInUp"
                        delay={index * 300}
                      >
                        <div
                          className="full-width"
                          key={element.id}
                          role="presentation"
                          onClick={() => handleModel(true, 'edit', element)}
                        >
                          <img
                            className="not-hover-show"
                            src="images/order-icon.svg"
                            alt="product"
                          />
                          <img className="hover-show" src="images/order-icon.svg" alt="product" />
                          <div className="earning-text full-width">{element.url}</div>
                          <div className="earning-price full-width">{element.name}</div>
                        </div>
                      </ScrollAnimation>
                    ))}
                </div>
                {addModel && (
                  <AddDBConfig visible={addModel} onCancel={handleModel} getData={getData} />
                )}
                {editModel && (
                  <EditDBConfig
                    visible={editModel}
                    data={editData}
                    onCancel={handleModel}
                    getData={getData}
                  />
                )}
              </div>
            </div>
          </Content>
        </React.Fragment>
      )}
    </Layout>
  );
};

export default Dashboard;
