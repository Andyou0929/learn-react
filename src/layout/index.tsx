import React, { useState } from 'react';
import "./index.css"
import RouterView from "../components/RouterView"
import { Button, Layout, Menu, theme } from 'antd';
import MyMenu from './components/Menu';
import MyHeader from './components/Header';

const { Header, Sider, Content } = Layout;

const MyLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ minHeight: "calc(100vh)", maxHeight: "calc(100vh)" }}>
        <div className="demo-logo-vertical" />
        <MyMenu collapsed={collapsed} /> {/* 传递 collapsed 属性 */}
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <MyHeader collapsed={collapsed} onSetCollapsed={() => { setCollapsed(!collapsed) }} />
        </Header>
        <Content
          style={{
            margin: '24px 16px 13px 16px',
            padding: 12,
            minHeight: "calc(100vh - 105px)",
            maxHeight: "calc(100vh - 105px)",
            overflowX: "scroll",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* {new Array(100).fill("0").map((item, index) => (
            <div key={index}>Content</div>
          ))} */}
          <RouterView></RouterView>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;