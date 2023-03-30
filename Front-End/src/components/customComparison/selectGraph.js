import React, { useEffect, useState } from 'react';
import { Button, Modal, Select } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useSimpleReactValidator from '../../shared/hooks/useSimpleReactValidator';
import { FormMain } from '../authentication/authentication-style';
import ApiUtils from '../../helpers/APIUtils';

const api = msg => new ApiUtils(msg);

const SelectGraph = ({ visible, onCancel, getData }) => {
  const { userId } = useSelector(state => state.auth.user);

  // const [fields, setFields] = useState({
  //   userId: userId.toString(),
  // });
  const [errors, setErrors] = useState({});
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [selectedDatabase, setSelectedDatabase] = useState(null);
  const [allSchemaOptions, setAllSchemaOptions] = useState([]);

  const [validator, showValidationMessage] = useSimpleReactValidator({}, {});

  const createSelectObject = res => {
    const optionData = [];

    res?.data?.data.map((e, index) =>
      optionData.push({
        id: index,
        label: e,
        value: e,
      })
    );
  };

  const getAllGraphs = async value => {
    setSelectedDatabase(value);

    try {
      const res = await api().getAllGraphBySchema(userId, value);

      console.log('res', res.data);

      createSelectObject(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllSchemas = async () => {
    try {
      const res = await api().getAllSchemas(userId);

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

  const submit = async e => {
    e.preventDefault();

    if (validator.allValid()) {
      setIsSubmitLoading(true);

      try {
        await api(true).addDBConfig(userId);
        getData();

        onCancel(false, 'add', null);
      } catch {
        setIsSubmitLoading(false);
      }
    } else {
      setIsSubmitLoading(false);
      setErrors(validator.getErrorMessages());
      showValidationMessage(true);
    }
  };

  useEffect(() => {
    getAllSchemas();
  }, []);

  return (
    <Modal
      centered
      maskClosable={false}
      open={visible}
      footer={null}
      onCancel={() => onCancel(false, 'add', null)}
      className="site-modal"
    >
      <FormMain onSubmit={submit} className="global-form full-width">
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
              getAllGraphs(newValue);
            }}
            options={allSchemaOptions}
            classname={errors?.name ? 'invalid' : ''}
          />
          {validator.message(`Scheme`, selectedDatabase, `required`)}
        </div>

        <div className="full-width form-field flex-center mb-0">
          <Button type="primary" htmlType="submit" className="submit-btn" loading={isSubmitLoading}>
            <span>Add</span>
          </Button>
        </div>
      </FormMain>
    </Modal>
  );
};

SelectGraph.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};

export default SelectGraph;
