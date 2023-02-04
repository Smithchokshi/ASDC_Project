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
  const [xaxis, setXaxis] = useState([
    'totalProducts',
    'totalEarning',
    'pendingOrders',
    'totalOrders',
  ]);
  const [yaxis, setYaxis] = useState([]);
  const [generalData, setGeneralData] = useState(initialState);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [loader, setLoader] = useState(false);
  const [allElements, setAllElements] = useState();
  const [todaysEarning, setTodaysEarning] = useState();
  const [earnings, setEarnings] = useState();
  const [view, setView] = useState(true);
  const handleChange = () => {};

  const columns = [
    {
      title: `${t('Order_Id')}`,
      dataIndex: 'orderId',
    },
    {
      title: `${t('Amount')}`,
      dataIndex: 'subTotal',
      render(text) {
        return <p>${text}</p>;
      },
    },
    {
      title: `${t('Inamate_name')}`,
      dataIndex: ['user', 'fullName'],
    },
  ];

  const handleLoader = bool => {
    setLoader(bool);
  };

  const handleForceUpdate = data => {
    setForceUpdate(data);
  };

  const SingleBox = [
    {
      key: '1',
      icon: 'images/product-icon.svg',
      hoverIcon: 'images/product-icon-hover.svg',
      title: `${t('Total_Products')}`,
      price: `${allData[0]?.totalProducts}`,
    },
    {
      key: '2',
      icon: 'images/earning-icon.svg',
      hoverIcon: 'images/earning-icon-hover.svg',
      title: `${t('Total_earnings')}`,
      price: `$ ${allData[0]?.totalEarnings}`,
    },
    {
      key: '3',
      icon: 'images/order-icon.svg',
      hoverIcon: 'images/order-icon-hover.svg',
      title: `${t('Pending_orders')}`,
      price: `${allData[0]?.pendingOrders}`,
    },
    {
      key: '4',
      icon: 'images/tottal-order-icon.svg',
      hoverIcon: 'images/tottal-order-icon-hover.svg',
      title: `${t('Total_orders')}`,
      price: `${allData[0]?.totalOrders}`,
    },
  ];

  const showModal = () => {
    setIscollapsed(true);
  };

  const getEarningData = async generalData => {
    handleLoader(true);
    try {
      const earningData = await api.getTodaysEarning({
        params: {
          page: generalData?.page,
          limit: generalData?.limit,
        },
        data: {
          startDate: generalData?.startDate,
          endDate: generalData?.endDate,
        },
      });
      setAllElements(earningData?.data?.data?.totalDocs);
      setTodaysEarning(earningData?.data?.data?.todayEarnings);
      setEarnings(earningData?.data?.data?.docs);
      if (earningData?.data?.data?.todayEarnings === 0) {
        setView(null);
      }
      // setAllData([data?.data]);
      handleLoader(false);
    } catch {
      handleLoader(false);
    }
  };

  const getData = async () => {
    handleLoader(true);
    try {
      const { data } = await api.getDashboard();
      setAllData([data?.data]);
      console.log(data?.data);
      const yaxisData = [
        data?.data?.totalProducts,
        data?.data?.totalEarnings,
        data?.data?.pendingOrders,
        data?.data?.totalOrders,
      ];
      setYaxis(yaxisData);
      handleLoader(false);
    } catch (e) {
      handleLoader(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getEarningData(generalData);
  }, [generalData?.page]);

  return (
    <Layout>
      {loader ? (
        <Loader />
      ) : (
        <React.Fragment>
          <TopHeader title="Dashboard" />
          <Content>
            <div className="site-layout-background">
              <div className="top-boxes full-width">
                <Charts xaxis={xaxis} yaxis={yaxis} type="bar" />
                {SingleBox.map((element, index) => (
                  <ScrollAnimation
                    animateOnce
                    className="full-width single-box"
                    animateIn="fadeInUp"
                    delay={index * 300}
                  >
                    <div className="full-width" key={element.key}>
                      <img className="not-hover-show" src={element.icon} alt="product" />
                      <img className="hover-show" src={element.hoverIcon} alt="product" />
                      <div className="earning-text full-width">{element.title}</div>
                      <div className="earning-price full-width">{element.price}</div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
              <ScrollAnimation
                animateOnce
                className="full-width single-box"
                animateIn="fadeIn"
                delay={1200}
              >
                <div className="full-width tottal-earning-title flex-center">
                  <div className="flex-center">
                    <span style={{ marginRight: '10px' }}>{t('Todays_earnings')}</span>{' '}
                    <h3> $ {todaysEarning}</h3>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => setView(!view)}
                    role="presentation"
                  >
                    {view === true ? `${t('View_Less')}` : view === false && `${t('View_More')}`}
                  </div>
                </div>
                {view && (
                  <div className="full-width default-table mt-20">
                    <Table columns={columns} dataSource={earnings} pagination={false} />
                    {allElements > 0 && (
                      <div className="custom-pagination-footer pagination-footer">
                        <Pagination
                          style={{ marginTop: '15px' }}
                          defaultPageSize={generalData?.limit}
                          defaultCurrent={generalData?.page}
                          total={allElements}
                          onChange={e => setGeneralData(prev => ({ ...prev, page: e }))}
                        />
                        <span className="total-element-count">
                          {t('Total_Count')}: {allElements}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </ScrollAnimation>
            </div>
          </Content>
        </React.Fragment>
      )}
    </Layout>
  );
};

export default Dashboard;
