import { Button } from "antd"
import { MenuUnfoldOutlined,MenuFoldOutlined } from "@ant-design/icons";
interface MyHeaderType{
  collapsed:Boolean;
  onSetCollapsed:Function;
}
const MyHeader:React.FC<MyHeaderType> = (props:MyHeaderType)=>{
  const {collapsed,onSetCollapsed} = props;
  return (
    <div>
      <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => onSetCollapsed()}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
    </div>
  )
}

export default MyHeader;