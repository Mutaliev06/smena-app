import React from 'react';
import "antd/dist/antd.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { Layout } from 'antd';
const { Content } = Layout;

function App() {

  return (
    <div>
      <Content>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
          </Switch>
        </BrowserRouter>
      </Content>
    </div>
  );
}

export default App;
