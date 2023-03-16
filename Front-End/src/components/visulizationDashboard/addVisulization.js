import React, { useState, useEffect } from 'react';
import { Input, Button, Select, Layout } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import useSimpleReactValidator from '../../shared/hooks/useSimpleReactValidator';
import { FormMain } from '../authentication/authentication-style';
import ApiUtils from '../../helpers/APIUtils';
import TopHeader from '../../shared/top-header/top-header';
import Chart from '../../shared/Chart/chart';

const api = msg => new ApiUtils(msg);

const { Content } = Layout;

const AddVisulization = () => {
  const history = useHistory();
  const location = useLocation();
  const { userId } = useSelector(state => state.auth.user);

  const fields = {
    userId: userId.toString(),
  };
  const [errors, setErrors] = useState({});
  const [xAxis, setXAxis] = useState([]);
  const [yAxis, setYAxis] = useState([]);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [allSchemaOptions, setAllSchemaOptions] = useState([]);
  const [tableOptions, setTableOptions] = useState([]);
  const [columnXOptions, setColumnXOptions] = useState([]);
  const [columnYOptions, setColumnYOptions] = useState([]);
  const graphTypeOption = [
    {
      id: 1,
      label: 'Bar',
      value: 'bar',
    },
    {
      id: 2,
      label: 'Pie',
      value: 'pie',
    },
    {
      id: 3,
      label: 'Line',
      value: 'line',
    },
  ];
  const dataTypeOptions = [
    {
      id: 1,
      label: 'Count',
      value: 'COUNT',
    },
    {
      id: 2,
      label: 'Average',
      value: 'AVG',
    },
    {
      id: 3,
      label: 'Sum',
      value: 'SUM',
    },
  ];
  const [selectedGraphType, setSelectedGraphType] = useState(null);
  const [selectedDataType, setSelectedDataType] = useState(null);
  const [selectedDatabase, setSelectedDatabase] = useState(null);
  const [selectedXTable, setSelectedXTable] = useState(null);
  const [selectedYTable, setSelectedYTable] = useState(null);
  const [xColumn, setXColumn] = useState(null);
  const [yColumn, setYColumn] = useState(null);
  const [name, setName] = useState(null);
  const payloadObject = {
    connectionId: window.location.pathname.split('/')[3],
    schema: null,
    table: null,
  };

  const [validator, showValidationMessage] = useSimpleReactValidator({}, {});

  const createSelectObject = (res, keyword, column = null) => {
    const optionData = [];

    res?.data?.data.map((e, index) =>
      optionData.push({
        id: index,
        label: e,
        value: e,
      })
    );

    if (keyword === 'table') setTableOptions(optionData);
    if (keyword === 'column') {
      if (column === 'x') setColumnXOptions(optionData);
      else setColumnYOptions(optionData);
    }
  };

  const handleCreateGraph = async data => {
    try {
      const res = await api(true).createGraph(data);

      console.log(res?.data?.data);

      history.push(`/visualization/${payloadObject.connectionId}`, {
        name: location.state.name,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handlePreviewGraph = async data => {
    try {
      const res = await api(true).previewGraph(data);

      console.log(res?.data?.data);
      setXAxis(res?.data?.data?.x);
      setYAxis(res?.data?.data?.y);
    } catch (e) {
      console.log(e);
    }
  };

  const submit = async (e, type) => {
    e.preventDefault();

    if (validator.allValid()) {
      setIsSubmitLoading(true);

      try {
        const data = {};

        data.connectionId = parseInt(payloadObject.connectionId, 10);
        if (type === 'create') {
          data.userId = parseInt(fields.userId, 10);
          data.name = name;
          data.chartType = selectedGraphType;
          data.schemaName = selectedDatabase;
          data.xTable = selectedXTable;
          data.xAttribute = xColumn;
          data.yTable = selectedYTable;
          data.yAttribute = yColumn;
        } else {
          data.schemaName = selectedDatabase;
          data.tableNameOne = selectedXTable;
          data.tableNameTwo = selectedYTable;
          data.xColumn = xColumn;
          data.yColumn = yColumn;
        }
        data.calculation = selectedDataType;

        if (type === 'create') await handleCreateGraph(data);
        else await handlePreviewGraph(data);
        setIsSubmitLoading(false);
      } catch {
        setIsSubmitLoading(false);
      }
    } else {
      setIsSubmitLoading(false);
      setErrors(validator.getErrorMessages());
      showValidationMessage(true);
    }
  };

  const getAllTables = async value => {
    setSelectedDatabase(value);
    setSelectedXTable(null);
    setSelectedYTable(null);
    setXAxis([]);
    setYAxis([]);
    setXColumn(null);
    setYColumn(null);

    try {
      const data = payloadObject;

      data.schema = value;

      const res = await api().getTables(data);

      console.log('res', res.data);

      createSelectObject(res, 'table');
    } catch (e) {
      console.log(e);
    }
  };

  const getAllColumns = async (value, column) => {
    if (column === 'x') {
      setSelectedXTable(value);
      setXColumn(null);
      setXAxis([]);
      setYAxis([]);
    } else {
      setSelectedYTable(value);
      setYColumn(null);
      setXAxis([]);
      setYAxis([]);
    }

    try {
      const data = payloadObject;

      data.schema = selectedDatabase;
      data.table = value;

      const res = await api().getColumns(data);

      createSelectObject(res, 'column', column);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const res = await api().getDatabases(payloadObject);

      const data = [];

      // eslint-disable-next-line array-callback-return
      res?.data?.data.map((e, index) => {
        data.push({
          id: index,
          label: e,
          value: e,
        });
      });

      setAllSchemaOptions(data);
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
        <TopHeader title="Add Dashboard" />
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
                      classname={errors?.name ? 'invalid' : ''}
                    />
                    {validator.message(`Name`, name, `required`)}
                  </div>

                  <div className="full-width form-field">
                    <div className="label">Select Scheme</div>
                    <Select
                      showSearch
                      style={{
                        backgroundColor: '#fff',
                        width: 200,
                      }}
                      value={selectedDatabase}
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) => (option?.label ?? '').includes(input)}
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '')
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? '').toLowerCase())
                      }
                      onChange={newValue => {
                        getAllTables(newValue);
                      }}
                      options={allSchemaOptions}
                      classname={errors?.name ? 'invalid' : ''}
                    />
                    {validator.message(`Scheme`, selectedDatabase, `required`)}
                  </div>

                  <div className="full-width form-field">
                    <div className="label">Select Graph Type</div>
                    <Select
                      style={{
                        width: 200,
                      }}
                      value={selectedGraphType}
                      placeholder="Select Graph Type"
                      optionFilterProp="children"
                      filterOption={(input, option) => (option?.label ?? '').includes(input)}
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '')
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? '').toLowerCase())
                      }
                      onChange={newValue => {
                        setSelectedGraphType(newValue);
                        setXAxis([]);
                        setYAxis([]);
                      }}
                      options={graphTypeOption}
                      classname={errors?.selectedGraphType ? 'invalid' : ''}
                    />
                    {validator.message(`Type`, selectedGraphType, `required`)}
                  </div>

                  <div className="full-width form-field">
                    <div className="label">Select Data Type</div>
                    <Select
                      style={{
                        width: 200,
                      }}
                      value={selectedDataType}
                      placeholder="Select Data Type"
                      optionFilterProp="children"
                      filterOption={(input, option) => (option?.label ?? '').includes(input)}
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '')
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? '').toLowerCase())
                      }
                      onChange={newValue => {
                        setSelectedDataType(newValue);
                        setXAxis([]);
                        setYAxis([]);
                      }}
                      options={dataTypeOptions}
                      classname={errors?.selectedDataType ? 'invalid' : ''}
                    />
                    {validator.message(`Type`, selectedDataType, `required`)}
                  </div>
                </FormMain>

                <FormMain className="global-form full-width add-graph-form">
                  <div className="full-width form-field">
                    <div className="label">Select X Table</div>
                    <Select
                      showSearch
                      style={{
                        width: 200,
                      }}
                      value={selectedXTable}
                      disabled={selectedDatabase == null}
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) => (option?.label ?? '').includes(input)}
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '')
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? '').toLowerCase())
                      }
                      onChange={newValue => {
                        getAllColumns(newValue, 'x');
                      }}
                      options={tableOptions}
                      classname={errors?.selectedXTable ? 'invalid' : ''}
                    />
                    {validator.message(`Table`, selectedXTable, `required`)}
                  </div>

                  <div className="full-width form-field">
                    <div className="label">Select X Column</div>
                    <Select
                      showSearch
                      style={{
                        width: 200,
                      }}
                      value={xColumn}
                      disabled={selectedXTable == null}
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) => (option?.label ?? '').includes(input)}
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '')
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? '').toLowerCase())
                      }
                      onChange={newValue => {
                        setXAxis([]);
                        setYAxis([]);
                        setXColumn(newValue);
                      }}
                      options={columnXOptions}
                      classname={errors?.xColumn ? 'invalid' : ''}
                    />
                    {validator.message(`XColumn`, xColumn, `required`)}
                  </div>

                  <div className="full-width form-field">
                    <div className="label">Select Y Table</div>
                    <Select
                      showSearch
                      style={{
                        width: 200,
                      }}
                      value={selectedYTable}
                      disabled={selectedDatabase == null}
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) => (option?.label ?? '').includes(input)}
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '')
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? '').toLowerCase())
                      }
                      onChange={newValue => {
                        getAllColumns(newValue, 'y');
                      }}
                      options={tableOptions}
                      classname={errors?.selectedYTable ? 'invalid' : ''}
                    />
                    {validator.message(`Table`, selectedYTable, `required`)}
                  </div>

                  <div className="full-width form-field">
                    <div className="label">Select Y Column</div>
                    <Select
                      showSearch
                      style={{
                        width: 200,
                      }}
                      value={yColumn}
                      disabled={selectedYTable == null}
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) => (option?.label ?? '').includes(input)}
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '')
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? '').toLowerCase())
                      }
                      onChange={newValue => {
                        setXAxis([]);
                        setYAxis([]);
                        setYColumn(newValue);
                      }}
                      options={columnYOptions}
                      classname={errors?.yColumn ? 'invalid' : ''}
                    />
                    {validator.message(`YColumn`, yColumn, `required`)}
                  </div>
                </FormMain>

                <FormMain className="global-form full-width add-graph-form">
                  <div className="full-width form-field flex-center mb-0">
                    <Button
                      type="primary"
                      className="submit-btn"
                      onClick={e => submit(e, 'preview')}
                      loading={isSubmitLoading}
                    >
                      <span>Preview Graph</span>
                    </Button>
                  </div>

                  <div className="full-width form-field flex-center mb-0">
                    <Button
                      type="primary"
                      className="submit-btn"
                      onClick={e => submit(e, 'create')}
                      loading={isSubmitLoading}
                    >
                      <span>Create Graph</span>
                    </Button>
                  </div>
                </FormMain>
              </div>
            </div>

            <div className="site-layout-background">
              <div className="top-boxes full-width" style={{ top: '20px' }}>
                {xAxis.length > 0 && yAxis.length > 0 && (
                  <span className="chart">
                    <Chart xaxis={xAxis} yaxis={yAxis} type={selectedGraphType} />
                  </span>
                )}
              </div>
            </div>
          </div>
        </Content>
      </React.Fragment>
    </Layout>
  );
};

export default AddVisulization;
