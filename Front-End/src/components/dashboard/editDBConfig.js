import React, { useState, useEffect } from 'react';
import { Input, Button, Modal, Upload, notification } from 'antd';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useSimpleReactValidator from '../../shared/hooks/useSimpleReactValidator';
import { FormMain } from '../authentication/authentication-style';
import ApiUtils from '../../helpers/APIUtils';

const api = msg => new ApiUtils(msg);

const EditDBConfig = ({ visible, onCancel, getData, data }) => {


    const history = useHistory();

    const [fields, setFields] = useState({});
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [isLoading, setLoading] = useState(false);


    const [validator, showValidationMessage] = useSimpleReactValidator(
        {},
        {}
    );

    useEffect(() => {
        setFields(prev => ({
            ...prev,
            id: data.id,
            userId: data.userId,
            db_username: data.db_username,
            db_password: data.db_password,
            url: data.url,
            name: data.name
        }))
    },[data])

    const handleChange = (field) => e => {
        setFields(prev => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const submit = async e => {
        e.preventDefault();

        if (validator.allValid()) {
            setIsSubmitLoading(true);

            const res = await api().editDBConfig(fields);

            getData();

            onCancel(false, 'edit', null);

            try {
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
            onCancel={() => onCancel(false, 'edit', null)}
            className="site-modal"
        >
            <FormMain onSubmit={submit} className="global-form full-width">
                <div className="full-width form-field">
                    <div className="label">DB URL</div>
                    <Input
                        placeholder="DB URL"
                        value={fields?.url ? fields?.url : null}
                        onChange={handleChange('url')}
                    />
                    {validator.message(
                        `DB URL`,
                        fields?.url,
                        `required`
                    )}
                </div>

                <div className="full-width form-field">
                    <div className="label">DB Name</div>
                    <Input
                        placeholder="DB Name"
                        value={fields?.name ? fields?.name : null}
                        onChange={handleChange('name')}
                    />
                    {validator.message(
                        `DB Name`,
                        fields?.name,
                        `required`
                    )}
                </div>

                <div className="full-width form-field">
                    <div className="label">Username</div>
                    <Input
                        placeholder="Username"
                        value={fields?.db_username ? fields?.db_username : null}
                        onChange={handleChange('db_username')}
                    />
                    {validator.message(
                        `Username`,
                        fields?.db_username,
                        `required`
                    )}
                </div>

                <div className="full-width form-field">
                    <div className="label">Password</div>
                    <Input.Password
                        placeholder="Password"
                        value={fields?.db_password ? fields?.db_password : null}
                        onChange={handleChange('db_password')}
                    />
                    {validator.message(
                        `Password`,
                        fields?.db_password,
                        `required`
                    )}
                </div>

                <div className="full-width form-field flex-center mb-0">
                    <Button type="primary" htmlType="submit" className="submit-btn" loading={isSubmitLoading}>
                        <span>Test Connection</span>
                    </Button>
                    <Button type="primary" htmlType="submit" className="submit-btn" loading={isSubmitLoading}>
                        <span>Edit</span>
                    </Button>
                </div>
            </FormMain>
        </Modal>
    );
};

EditDBConfig.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
    data: PropTypes.instanceOf(Object).isRequired
};

export default EditDBConfig;
