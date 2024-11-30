/*
 * @Author: anxia.ack anchenkai@come-future.com
 * @Date: 2024-11-18 20:10:43
 * @LastEditors: anxia.ack anchenkai@come-future.com
 * @LastEditTime: 2024-11-30 17:20:16
 * @FilePath: /learn-react/src/layout/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';
import "./index.css"
import RouterView from "../components/RouterView"
import { Button, Layout, Menu, theme } from 'antd';
import MyMenu from './components/Menu';
import MyHeader from './components/Header';

const { Header, Sider, Content } = Layout;

const MyLayout: React.FC = () => {
  /**实现菜单收起与展开 */
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider theme='dark' trigger={null} collapsible collapsed={collapsed} style={{ minHeight: "calc(100vh)", maxHeight: "calc(100vh)" }}>
        <div className="demo-logo-vertical" />
        {/* 菜单 */}
        <MyMenu/> {/* 传递 collapsed 属性 */}
      </Sider>
      <Layout>
        {/* 页面头部 */}
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <MyHeader collapsed={collapsed} onSetCollapsed={() => { setCollapsed(!collapsed) }} />
        </Header>
        {/* 页面内容 */}
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
          {/* 单页面展示区域 */}
          <RouterView></RouterView>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;