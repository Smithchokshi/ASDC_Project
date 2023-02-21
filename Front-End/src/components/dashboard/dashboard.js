/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Layout, Menu, Table, Button, Dropdown, Pagination } from 'antd';
import { useTranslation, Trans } from 'react-i18next';
import ScrollAnimation from 'react-animate-on-scroll';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Sidebar from '../../shared/sidebar/sidebar';
import Loader from '../../shared/loader/Loader';
import TopHeader from '../../shared/top-header/top-header';
import Charts from '../../shared/Chart/chart';
import AddDBConfig from './addDBConfig';
import EditDBConfig from "./editDBConfig";

import notificationHandler, { openNotificationWithIconError } from '../../constants/notification';
import ApiUtils from '../../helpers/APIUtils';

const api = new ApiUtils();

const { Content } = Layout;

const initialState = {
  page: '1',
  limit: '10',
  search: '',
  sortCol: '',
  sortVal: '',
  pagination: true,
  startDate: moment().startOf('day').toISOString(),
  endDate: moment().endOf('day').toISOString(),
};

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const [iscollapsed, setIscollapsed] = useState(false);
  const [allData, setAllData] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [loader, setLoader] = useState(false);
  const [addModel, setAddModel] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [editData, setEditData] = useState({});

  const handleLoader = bool => {
    setLoader(bool);
  };

  const handleModel = (bool, method, data) => {
    if(method === 'add') setAddModel(bool);
    if(method === 'edit') {
      setEditModel(bool);
      setEditData(data);
    }
  }

  const getData = async () => {
    handleLoader(true);
    try {
      const { data } = await api.getDashboard();
      setAllData(data);
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
                {allData.map((element, index) => (
                  <ScrollAnimation
                    animateOnce
                    className="full-width single-box"
                    animateIn="fadeInUp"
                    delay={index * 300}
                  >
                    <div className="full-width" key={element.id} role="presentation" onClick={() => handleModel(true, 'edit', element)}>
                      <img className="not-hover-show" src="images/order-icon.svg" alt="product" />
                      <img className="hover-show" src="images/order-icon.svg" alt="product" />
                      <div className="earning-text full-width">{element.url}</div>
                      <div className="earning-price full-width">{element.name}</div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
              {addModel && <AddDBConfig visible={addModel} onCancel={handleModel} getData={getData}/>}
              {editModel && <EditDBConfig visible={editModel} data={editData} onCancel={handleModel} getData={getData}/>}
            </div>
            </div>
          </Content>
        </React.Fragment>
      )}
    </Layout>
  );
};

export default Dashboard;
