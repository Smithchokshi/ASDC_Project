import React, { useState, useEffect } from 'react';
import { Input, Button, Modal, Upload, notification, Select } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useSimpleReactValidator from '../../shared/hooks/useSimpleReactValidator';
import { FormMain } from '../authentication/authentication-style';
import ApiUtils from '../../helpers/APIUtils';

const api = msg => new ApiUtils(msg);

const AddVisulization = ({ visible, onCancel, getData }) => {
  const history = useHistory();
  const { userId } = useSelector(state => state.auth.user);

  const [fields, setFields] = useState({
    userId: userId.toString(),
  });
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [validator, showValidationMessage] = useSimpleReactValidator({}, {});

  const handleChange = field => e => {
    setFields(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const testDBConnection = async () => {
    const data = {
      url: fields.url,
      dbUsername: fields.dbUsername,
      dbPassword: fields.dbPassword,
    };

    try {
      const res = await api().testDBConfig(data);

      console.log(res.data.data);

      if (res.data.data) {
        notification.success({
          message: 'Success',
          description: 'Connected',
        });
      } else {
        notification.error({
          message: 'Error',
          description: 'Not able to Connect',
        });
      }
    } catch {}
  };

  const submit = async e => {
    e.preventDefault();

    if (validator.allValid()) {
      setIsSubmitLoading(true);

      try {
        const res = await api(true).addDBConfig(fields);

        getData();

        onCancel(false, 'add', null);
      } catch {
        setIsSubmitLoading(false);
      }
    } else {
    }
  };

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
          <div className="label">DB URL</div>
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
            options={[
              {
                value: '1',
                label: 'Not Identified',
              },
              {
                value: '2',
                label: 'Closed',
              },
              {
                value: '3',
                label: 'Communicated',
              },
              {
                value: '4',
                label: 'Identified',
              },
              {
                value: '5',
                label: 'Resolved',
              },
              {
                value: '6',
                label: 'Cancelled',
              },
            ]}
          />
          {validator.message(`DB URL`, fields?.url, `required`)}
        </div>

        <div className="full-width form-field">
          <div className="label">DB Name</div>
          <Input
            placeholder="DB Name"
            value={fields?.name ? fields?.name : null}
            onChange={handleChange('name')}
          />
          {validator.message(`DB Name`, fields?.name, `required`)}
        </div>

        <div className="full-width form-field">
          <div className="label">Username</div>
          <Input
            placeholder="Username"
            value={fields?.dbUsername ? fields?.dbUsername : null}
            onChange={handleChange('dbUsername')}
          />
          {validator.message(`Username`, fields?.dbUsername, `required`)}
        </div>

        <div className="full-width form-field">
          <div className="label">Password</div>
          <Input.Password
            placeholder="Password"
            value={fields?.dbPassword ? fields?.dbPassword : null}
            onChange={handleChange('dbPassword')}
            autocomplete="new-password"
          />
          {validator.message(`Password`, fields?.dbPassword, `required`)}
        </div>

        <div className="full-width form-field flex-center mb-0">
          <Button
            type="primary"
            htmlType="button"
            className="submit-btn"
            loading={isSubmitLoading}
            onClick={testDBConnection}
          >
            <span>Test Connection</span>
          </Button>
          <Button type="primary" htmlType="submit" className="submit-btn" loading={isSubmitLoading}>
            <span>Add</span>
          </Button>
        </div>
      </FormMain>
    </Modal>
  );
};

AddVisulization.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};

export default AddVisulization;
