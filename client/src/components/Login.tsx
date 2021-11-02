import { Form, Input, Button, Checkbox, Row, Col, Divider, Alert } from 'antd';
import React, { useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import {ApplicationStateType, authUser} from '../redux/features/application';
import { useDispatch, useSelector } from 'react-redux';
import { Content } from 'antd/es/layout/layout';
import {RootState} from "../react-app-env";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const application: ApplicationStateType = useSelector((state: RootState) => state.application);

  const auth = (values: any) => {
    const {username, password} = values;
    dispatch(authUser(username, password, history))
  };

  useEffect(() => {
    dispatch({type: "application/signin/rejected", error: null});
  }, [dispatch]);

  if (application.token) {
    return (
      <Redirect to="/"/>
    )
  }

  return (
    <div>
      <Row justify="center">
        <Col span={6} style={{ height: "100vh", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Divider plain>Авторизация</Divider>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={auth}
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
                  SignIn
                </Button>
                <Button>
                  <Link to="/register">
                    SignUp
                  </Link>
                </Button>
              </Content>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
