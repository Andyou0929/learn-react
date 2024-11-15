import {TodoItemType} from "../types/index"
export function fetchTodos(): TodoItemType[] {
  return [
    { id: 1, text: 'Learn React', completed: false, isUpdateState: false },
    { id: 2, text: 'Learn Redux', completed: false, isUpdateState: false },
    { id: 3, text: 'Learn GraphQL', completed: true, isUpdateState: false },
    { id: 4, text: 'Learn Apollo', completed: true, isUpdateState: false },
    { id: 5, text: 'Learn React Native', completed: true, isUpdateState: false },
  ]
}
