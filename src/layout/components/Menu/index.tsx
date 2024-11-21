import React, { useState } from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import "../../index.css"
import routers from '../../../router';
import { icons } from 'antd/es/image/PreviewGroup';
import { MenuItemType, SubMenuType } from 'antd/es/menu/interface';
interface MyMenuProps {
  collapsed: boolean;
}

const MyMenu: React.FC<MyMenuProps> = (props: MyMenuProps) => {
  const { collapsed } = props;
  const arr = [];
  const getMenuItem = (router: any, index: number): SubMenuType => ({
    key: router.path,
    label: router.meta?.title,
    icon: router.meta?.icon,
    children: router.children?.map((child: any, childIndex: number) => getMenuItem(child, childIndex))
  });
  return (
   <div>
      <div className='logo-vertical'></div>
      <Menu
      style={{minHeight: "89vh",maxHeight:"89vh",overflowX:"scroll"}}
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      items={routers[0]?.children?.slice(1).map((router, index) => getMenuItem(router, index))}
    />
   </div>
  );
};

export default MyMenu;