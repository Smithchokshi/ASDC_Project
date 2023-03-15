import React, { useEffect } from 'react';
import { Layout, Button } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';
// import Loader from '../../shared/loader/Loader';
import TopHeader from '../../shared/top-header/top-header';
// import ApiUtils from '../../helpers/APIUtils';
// import Chart from '../../shared/Chart/chart';

// const api = msg => new ApiUtils(msg);

const { Content } = Layout;

const VisulizationDashboard = () => {
  const location = useLocation();
  const history = useHistory();

  const title = location.state.name;
  // const [loader, setLoader] = useState(false);
  // const [allData, setAllData] = useState([]);
  const payloadObject = {
    userId: window.location.pathname.split('/')[2],
    database: null,
    table: null,
  };
  // const [xAxis, setXAxis] = useState([]);
  // const [yAxis, setYAxis] = useState([]);

  // const handleLoader = bool => {
  //   setLoader(bool);
  // };

  // const getData = async () => {
  //   handleLoader(true);
  //   try {
  //     const res = await api(true).getDatabases(payloadObject);
  //
  //     setAllData(res?.data?.data);
  //
  //     handleLoader(false);
  //   } catch (e) {
  //     handleLoader(false);
  //   }
  // };

  // const setGraphData = data => {
  //   setXAxis(data?.x);
  //   setYAxis(data?.y);
  // };

  useEffect(() => {
    // getData();
  }, []);

  return (
    <Layout>
      {/* {loader ? ( */}
      {/*   <Loader /> */}
      {/* ) : ( */}
      <React.Fragment>
        <TopHeader title={`${title} Dashboard`} />
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
                    <Button
                      className="reset-btn"
                      onClick={() => history.push(`/visualization/add/${payloadObject?.userId}`)}
                    >
                      {/* <img src={`${S3BucketURL}commissary/add-icon.svg`} alt="Add Category" />{' '} */}
                      Add DB Config
                    </Button>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
            <div className="site-layout-background">
              <div className="top-boxes full-width">
                {/* {xAxis.length > 0 && yAxis.length > 0 && ( */}
                {/*   <Chart xaxis={xAxis} yaxis={yAxis} type="bar" /> */}
                {/* )} */}
                {/*  {dashboardData.map((element, index) => ( */}
                {/*    <ScrollAnimation */}
                {/*      animateOnce */}
                {/*      className="full-width single-box" */}
                {/*      animateIn="fadeInUp" */}
                {/*      delay={index * 300} */}
                {/*    > */}
                {/*      <div */}
                {/*        className="full-width" */}
                {/*        key={element.id} */}
                {/*        role="presentation" */}
                {/*        onClick={() => handleModel(true, 'edit', element)} */}
                {/*      > */}
                {/*        <img className="not-hover-show" src="images/order-icon.svg" alt="product" /> */}
                {/*        <img className="hover-show" src="images/order-icon.svg" alt="product" /> */}
                {/*        <div className="earning-text full-width">{element.url}</div> */}
                {/*        <div className="earning-price full-width">{element.name}</div> */}
                {/*      </div> */}
                {/*    </ScrollAnimation> */}
                {/*  ))} */}
              </div>
            </div>
          </div>
        </Content>
      </React.Fragment>
      {/* )} */}
    </Layout>
  );
};

export default VisulizationDashboard;
