import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from './Preloader';
import { loadUser } from '../redux/features/users';
import { Redirect } from 'react-router-dom';
import { Card, Row, Col, Button } from 'antd';
import {ApplicationStateType, logout} from '../redux/features/application';
import {UserStateType} from '../redux/features/users';
import { RootState } from '../react-app-env';

const { Meta } = Card;

function Home() {
  const dispatch = useDispatch();

  const application: ApplicationStateType = useSelector((state: RootState) => state.application);
  const users: UserStateType = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(loadUser(application.token));
  }, [dispatch, application.token]);

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(logout());
  };

  if (users.loading) {
    return <Preloader />;
  }

  if (!application.token) {
    return (
        <Redirect to="/login"/>
    )
  }

  return (
    <div>
      {
        !users.user ? <Redirect to="/login"/> : (
          <Row justify="center">
            <Col span={8} style={{height: "100vh", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={users.user.avatar} />}
                title={`${users.user.id} - ${users.user.username}`}
              >
                <Meta title="О пользователе:" description={users.user.about} />
              </Card>
              <Button onClick={handleLogout} type="primary" htmlType="submit">
                Logout
              </Button>
            </Col>
          </Row>
        )
      }
    </div>
  )
}

export default Home;
