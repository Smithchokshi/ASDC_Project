import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const Charts = ({ xaxis, yaxis, type }) => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  const handleChartData = () => {
    const option = {
      chart: {
        id: 'apexchart-example',
      },
      xaxis: {
        categories: xaxis,
      },
    };
    const serie = [
      {
        name: 'series-1',
        data: yaxis,
      },
    ];
    setOptions(option);
    setSeries(serie);
  };

  useEffect(() => {
    handleChartData();
  }, []);

  return <ReactApexChart options={options} series={series} type={type} width={300} height={300} />;
};

Charts.prototype = {
  xaxis: PropTypes.instanceOf(Array).isRequired,
  yaxis: PropTypes.instanceOf(Array).isRequired,
  type: PropTypes.string.isRequired,
};

export default Charts;