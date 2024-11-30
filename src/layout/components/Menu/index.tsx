import React, { useState } from 'react';
import { Menu } from 'antd';
import "../../index.css"
import routers from '../../../router';
import { SubMenuType } from 'antd/es/menu/interface';
import { useNavigate } from 'react-router-dom';
interface MyMenuProps {
}

const MyMenu: React.FC<MyMenuProps> = (props: MyMenuProps) => {
  // 当前选择的menu的key
  const [nowKey,setNowKey] = useState<string>();
  // 路由跳转
  const navigate = useNavigate();
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
        theme="dark"

        style={{ minHeight: "89vh", maxHeight: "89vh", overflowX: "scroll" }}
        mode="inline"
        defaultSelectedKeys={['1']}
        items={routers[0]?.children?.slice(1).map((router, index) => getMenuItem(router, index))}
        onClick={(menuItem) => {
          // 如果选中的是当前页面，不需要再次跳转
          if(nowKey === menuItem.key) return
          navigate(menuItem.key, { state: 123 })
          setNowKey(menuItem.key);
        }}
      />
    </div>
  );
};

export default MyMenu;