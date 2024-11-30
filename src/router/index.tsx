import { RouterType } from "./type";
import {HomeOutlined} from "@ant-design/icons"
import IconFont from "../components/Icon"
// 添加声明式路由
const routers: RouterType[] = [

  {
    name:"index",
    path: "/",
    children:[
      {
        path:"/",
        redirect:"/home",
      },
      {
        name:"home",
        path: "/home",
        component: () => import("../pages/Home"),
        meta:{
          title:"home",
          icon: <HomeOutlined />
        },
        
      },
      {
        name:"TodoList",
        path: "/todoList",
        component: () => import("../pages/TodoList"),
        meta:{
          title:"TodoList",
          icon:<IconFont type="icon-todolist"/>
        }
      },
      
    ]
  },
  

]

export default routers;