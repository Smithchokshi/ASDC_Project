import React, { useState, useEffect } from 'react';
import { Input, Button, Modal, Upload, notification, Select, Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useSimpleReactValidator from '../../shared/hooks/useSimpleReactValidator';
import { FormMain } from '../authentication/authentication-style';
import ApiUtils from '../../helpers/APIUtils';
import TopHeader from '../../shared/top-header/top-header';
import ScrollAnimation from 'react-animate-on-scroll';

const api = msg => new ApiUtils(msg);

const { Content } = Layout;

const AddVisulization = () => {
  const history = useHistory();
  const { userId } = useSelector(state => state.auth.user);

  const [fields, setFields] = useState({
    userId: userId.toString(),
  });
  const [allSchema, setAllSchema] = useState([]);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [allSchemaOptions, setAllSchemaOptions] = useState([]);
  const [tableOptions, setTableOptions] = useState([]);
  const [columnOptions, setColumnOptions] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [xColumn, setXColumn] = useState(null);
  const [yColumn, setYColumn] = useState(null);
  const [payloadObject, setPayloadObject] = useState({
    userId: window.location.pathname.split('/')[3],
    database: null,
    table: null,
  });

  const [validator, showValidationMessage] = useSimpleReactValidator({}, {});

  const handleChange = field => e => {
    setFields(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const createSelectObject = (res, keyword) => {
    const optionData = [];

    res?.data?.data.map((e, index) =>
      optionData.push({
        id: index,
        label: e,
        value: e,
      })
    );

    if (keyword === 'table') setTableOptions(optionData);
    if (keyword === 'column') setColumnOptions(optionData);
  };

  const submit = async e => {
    e.preventDefault();

    if (validator.allValid()) {
      setIsSubmitLoading(true);

      try {
        const data = {
          tableName: selectedTable,
          xColumn: xColumn,
          yColumn: yColumn,
          connectionId: payloadObject.userId,
        };

        const res = await api(true).createGraph(data);

        console.log(res.data.data);

        setGraphData(res.data.data);

        // getData();
        //
        onCancel(false, 'add', null);
      } catch {
        setIsSubmitLoading(false);
      }
    } else {
    }
  };

  const getAllTables = async value => {
    setSelectedDatabase(value);

    try {
      const data = payloadObject;

      data.database = value;

      const res = await api().getTables(data);

      console.log('res', res.data);

      createSelectObject(res, 'table');
    } catch {}
  };

  const getAllColumns = async value => {
    setSelectedTable(value);

    try {
      const data = payloadObject;

      data.database = selectedDatabase;
      data.table = value;

      const res = await api().getColumns(data);

      createSelectObject(res, 'column');
    } catch {}
  };

  const getData = async () => {
    try {
      const res = await api().getDatabases(payloadObject);

      setAllSchema(res?.data?.data);

      const data = [];

      res?.data?.data.map((e, index) => {
        data.push({
          id: index,
          label: e,
          value: e,
        });
      });

      setAllSchemaOptions(data);
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <React.Fragment>
        <TopHeader title={`Add Dashboard`} />
        <Content>
          <div>
            <div className="site-layout-background">
              <div className="top-boxes full-width">
                <FormMain onSubmit={submit} className="global-form full-width add-graph-form">
                  <div className="full-width form-field">
                    <div className="label">Select Scheme</div>
                    <Select
                      showSearch
                      style={{
                        width: 200,
                      }}
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
                    />
                    {validator.message(`Scheme`, selectedDatabase, `required`)}
                  </div>

                  <div className="full-width form-field">
                    <div className="label">Select Table</div>
                    <Select
                      showSearch
                      style={{
                        width: 200,
                      }}
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
                        getAllColumns(newValue);
                      }}
                      options={tableOptions}
                    />
                    {validator.message(`Table`, selectedTable, `required`)}
                  </div>

                  <div className="full-width form-field">
                    <div className="label">Select X Column</div>
                    <Select
                      showSearch
                      style={{
                        width: 200,
                      }}
                      disabled={selectedTable == null}
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) => (option?.label ?? '').includes(input)}
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '')
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? '').toLowerCase())
                      }
                      onChange={newValue => {
                        setXColumn(newValue);
                      }}
                      options={columnOptions}
                    />
                    {validator.message(`XColumn`, xColumn, `required`)}
                  </div>

                  <div className="full-width form-field">
                    <div className="label">Select Y Column</div>
                    <Select
                      showSearch
                      style={{
                        width: 200,
                      }}
                      disabled={selectedTable == null}
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) => (option?.label ?? '').includes(input)}
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '')
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? '').toLowerCase())
                      }
                      onChange={newValue => {
                        setYColumn(newValue);
                      }}
                      options={columnOptions}
                    />
                    {validator.message(`YColumn`, yColumn, `required`)}
                  </div>

                  <div className="full-width form-field flex-center mb-0">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="submit-btn"
                      loading={isSubmitLoading}
                    >
                      <span>Create Graph</span>
                    </Button>
                  </div>
                </FormMain>
              </div>
            </div>
          </div>
        </Content>
      </React.Fragment>
    </Layout>
  );
};

export default AddVisulization;
