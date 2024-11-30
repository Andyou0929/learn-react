/*
 * @Author: anxia.ack anchenkai@come-future.com
 * @Date: 2024-11-30 11:38:56
 * @LastEditors: anxia.ack anchenkai@come-future.com
 * @LastEditTime: 2024-11-30 17:10:51
 * @FilePath: /learn-react/src/pages/TodoList/components/TodoItem/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { TodoItemType } from "../../../../types/index"
import { Button, Input, Popconfirm, message, Checkbox, Tooltip, InputRef } from 'antd';
import "./index.css"
import { ChangeEvent, useRef, useState } from "react";
interface PropsType {
  onDelete: Function,
  onchange: Function,
  onSetUpdate: Function,
  onSetTodo: Function,
  index: number
}
export function TodoItem(props: Partial<TodoItemType> & PropsType) {
  const { id, text, completed, isUpdateState, onDelete, onchange, onSetUpdate, index, onSetTodo } = props;
  const [todoText, setTodoText] = useState(text)
  function handlerTodoChange(event: ChangeEvent<HTMLInputElement>) {
    setTodoText(event.target.value);
    onSetTodo(id, event.target.value);
  }
  
  const inputRef = useRef<InputRef>(null)
  function handlerUpdateClick() {
    onSetUpdate(id);
    setTimeout(() => {
      inputRef.current && inputRef.current.focus();
    })
  }
  function cancleUpdate() {
    if(!todoText) return message.error("Can not be empty！");
    onSetUpdate(id);
  }
  // 计算是否为编辑状态
  function computedEdit() {
    if (isUpdateState) {
      return (
        <Input
          style={{ width: "350px" }}
          ref={inputRef}
          value={todoText}
          onPressEnter={cancleUpdate}
          onChange={(event: ChangeEvent<HTMLInputElement>) => handlerTodoChange(event)}
          onBlur={cancleUpdate}
        />
      )
    } else {
      return (
        <Tooltip title={text}>
          <span className="todo-text" style={{ textDecoration: completed ? "line-through" : "none" }}>
            {text}
          </span>
        </Tooltip>

      )
    }
  }
  return (
    <li key={id} style={index === 0 ? { border: 0 } : {}}>
      <div>
        <Checkbox checked={completed} onChange={() => onchange(id)}>
          {index + 1}
          {computedEdit()}
        </Checkbox>
      </div>
      <div>
        {!isUpdateState && <Button variant="text" color='primary' onClick={handlerUpdateClick}>update</Button>}
        <Popconfirm
          title="Delete the todo"
          description="Are you sure to delete this todo?"
          onConfirm={() => {
            onDelete(id)
            message.success("successfully delete！")
          }}
          onCancel={() => {
            message.warning("undelete ok！")
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button variant="text" color='danger'>delete</Button>
        </Popconfirm>
      </div>
    </li>
  )
}