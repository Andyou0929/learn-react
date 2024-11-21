import { ReactNode, ReactSVG } from "react"
import { ComponentType } from "react";
import { IndexRouteObject, NonIndexRouteObject,RouteObject } from "react-router-dom";
// 路由信息类型
interface Meta{
  // 路由标题
  title:string,
  // 路由icon
  icon?:React.ReactElement | SVGAElement | ReactNode
}
// 路由配置类型，需要继承IndexRouteObject
export interface RouterType extends NonIndexRouteObject{
  // 路由名称
  name?:string,
  // 路由path
  path:string,
  // 路由重定向
  redirect?:string,
  // 路由懒加载类型
  component?:()=> Promise<{ default: ComponentType<any>; }>,
  meta?:Meta,
  children?:RouterType[],
}