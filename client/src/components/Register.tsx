import React, { useEffect } from 'react';
import { Alert, Button, Checkbox, Col, Divider, Form, Input, Row } from 'antd';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {ApplicationStateType, createUser} from '../redux/features/application';
import { Content } from 'antd/es/layout/layout';
import {RootState} from "../react-app-env";

function Register() {
  const dispatch = useDispatch();
  const application: ApplicationStateType = useSelector((state: RootState) => state.application);

  const history = useHistory();

  const regUser = (values: any) => {
    const {username, password} = values;
    dispatch(createUser(username, password, history))
  };

  useEffect(() => {
    dispatch({type: "application/signup/rejected", error: null});
  }, [dispatch]);

  if (application.token) {
    return (
      <Redirect to="/"/>
    )
  }

  return (
    <div>
      <Row justify="center">
        <Col span={8} style={{ height: "100vh", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Divider plain>Регистрация</Divider>
          <Form
            style={{ width: "300px"}}
            onFinish={regUser}
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            {application.error && <Alert message={application.error} type="error" showIcon />}

            <Form.Item
              name="remember"
              valuePropName="checked"
            >
              <Content style={{ display: 'flex', justifyContent: 'center'}}>
                <Checkbox>Remember me</Checkbox>
              </Content>
            </Form.Item>

            <Form.Item>
              <Content style={{ display: 'flex', justifyContent: 'space-around'}}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
                <Button>
                  <Link to="/login">
                    I already have an account
                  </Link>
                </Button>
              </Content>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
