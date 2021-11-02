import React from 'react';
import { Space, Spin } from 'antd';

function Preloader() {
  return (
    <div style={{height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Space size="middle">
        <Spin size="large" />
      </Space>,
    </div>
  );
}

export default Preloader;
