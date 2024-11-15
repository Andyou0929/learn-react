import { TodoItemType } from "../../type/index"
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