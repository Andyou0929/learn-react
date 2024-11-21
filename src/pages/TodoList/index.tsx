import { ChangeEvent, useEffect, useState } from 'react';
import './index.css';
import { Button, Card, Space, Input, Checkbox ,Popconfirm,message,Empty} from 'antd';
import { PlusOutlined } from "@ant-design/icons"

import { fetchTodos } from '../../mock/index';
import {TodoItemType} from "../../types/index"
import { TodoItem } from '../../components/TodoItem';



function Footer(props: { todos: TodoItemType[] }) {
  const { todos } = props;
  return (
    <div className='footer'>
      <span>Total/Completed: <span style={{ marginLeft: 10 }}> {todos.length}/{todos.filter(todo => todo.completed).length}</span></span>
    </div>
  )
}

function TodoList() {
  const [todos, setTodos] = useState<TodoItemType[]>(fetchTodos())
  const [todo, setTodo] = useState("")
  const [checkAll, setCheckAll] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  // 监听全选框的状态
  useEffect(() => {
    setCheckAll(!todos.length || todos.every(todo => todo.completed))
    const selectedTodoNum = todos.filter(todo => todo.completed).length
    setIndeterminate(selectedTodoNum > 0 && selectedTodoNum < todos.length)
  }, [todos])

  // 输入框改变的回调
  function handlerTodoChange(event: ChangeEvent<HTMLInputElement>) {
    setTodo(event.target.value)
  }

  // 新增todo的回调
  function handlerPlus() {
    // react向数组添加数据需要使用这种方式，使用push无效
    if (!todo) return;
    setTodos(todos => [...todos, {
      id: Date.now(),
      text: todo,
      completed: false,
      isUpdateState: false
    }]);
    setTodo("");
    // 如果需要使用这种方式需要将数组拷贝
    /* const flag = [...todos];
    flag.push({ id: 1, text: 'Learn React', completed: false })
    setTodos(()=>flag) */
  }

  // 删除todo的事件回调
  function handlerDelete(id: number) {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  function handlerSetUpdate(id: number){
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isUpdateState: !todo.isUpdateState } : todo))
  }
  function handlerChange(id: number) {
    /* 
    const flag = [...todos]
    flag[index].completed = !flag[index].completed;
    setTodos(flag)
    */
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  // 全选事件的回调
  function handlerChangeAll() {
    if (checkAll) {
      setTodos(todos.map(todo => ({ ...todo, completed: false })))
    } else {
      setTodos(todos.map(todo => ({ ...todo, completed: true })))
    }

  }

  // 删除所有已勾选的todo
  function handlerDeleteChecked() {
    setTodos(todos.filter(todo => !todo.completed))
  }
  function handlerSetTodo(id:number,todoText:string){
    setTodos(todos.map(todoItem => todoItem.id === id ? {...todoItem,text:todoText} : todoItem))
  }
  return (
    <div className="todo-list">
      <Card title="TodoList" className='card' hoverable style={{ width: 600 }}><ul>
        <Space.Compact style={{ width: '100%' }}>
          <Input className='todo-input'
            placeholder="please your input todo"
            allowClear
            value={todo}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handlerTodoChange(event)}
            onPressEnter={handlerPlus}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handlerPlus}>plus</Button>
        </Space.Compact>
        <li>
          <div>
            <Checkbox indeterminate={indeterminate} onChange={handlerChangeAll} checked={checkAll}>
              <div className='todo-text'>{checkAll ? "unCheck All" : "Check all"}</div>
            </Checkbox>
          </div>
          <Popconfirm
          title="Delete all selected todo"
          description="Are you sure to delete all selected todo?"
          onConfirm={() => {
            handlerDeleteChecked()
            message.success("successfully delete！")
          }}
          onCancel={() => {
            message.warning("undelete ok！")
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button variant="text" color='danger' disabled={!checkAll && !indeterminate}>delete checked</Button>
        </Popconfirm>
        </li>
        {!todos.length && <Empty/>}
        {
          todos.map((todo,index) => (
            // <TodoItem {...todo}/>
            <TodoItem
              key={todo.id}
              id={todo.id}
              index={index}
              text={todo.text}
              completed={todo.completed}
              isUpdateState={todo.isUpdateState}
              onDelete={handlerDelete}
              onchange={handlerChange}
              onSetUpdate={handlerSetUpdate}
              onSetTodo={handlerSetTodo}
            />
          ))
        }
      </ul>
        <Footer todos={todos} />
      </Card>

    </div>
  );
}

export default TodoList;
