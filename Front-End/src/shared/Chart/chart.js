import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const Charts = ({ xaxis, yaxis, type }) => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  const handleChartData = () => {
    if (type === 'pie') {
      setSeries(yaxis);
      setOptions({
        chart: {
          type,
        },
        labels: xaxis,
      });
    } else {
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
    }
  };

  useEffect(() => {
    console.log(xaxis, yaxis);
    handleChartData();
  }, []);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type={type}
      width={type === 'pie' ? 380 : 300}
      height={300}
    />
  );
};

Charts.prototype = {
  xaxis: PropTypes.instanceOf(Array).isRequired,
  yaxis: PropTypes.instanceOf(Array).isRequired,
  type: PropTypes.string.isRequired,
};

export default Charts;
