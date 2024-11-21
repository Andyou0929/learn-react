import { useRoutes, Navigate } from "react-router-dom";
import React from "react"
import routers from "../../router"
import { RouterType } from "../../router/type";
function generateRouter(routers:RouterType[]):RouterType[] {
  // @ts-ignore 需要关闭ts校验，不然会报错，可能会返回undefined
  return  routers.map(item => {
    let res = { ...item };
    if (!item?.path) return undefined;

    // component
    if (item?.component) {
      const Component = React.lazy(item.component);
      res.element = (<React.Suspense fallback={<div>加载中...</div>}>
        <Component />
      </React.Suspense>);
    }
    // children
    if (item?.children) {
      res.children = generateRouter(item.children);
    }
    // 重定向
    if (item?.redirect) {
      res.element = (
        <Navigate to={item.redirect} replace />
      )
    }
    return res;
  })
}
const Router = () => useRoutes(generateRouter(routers))
export default Router;