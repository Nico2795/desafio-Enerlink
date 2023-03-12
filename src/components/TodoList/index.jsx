import TodoListItem from "components/TodoListItem";
import React ,{useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles.css";

import { deleteTodoAsync, getTodoAsync, toggleCompleteAsync } from "components/redux/todoSlice";

const TodoList = () => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    // Fix an ability to delete task
    dispatch(deleteTodoAsync({
      id: id,
    }))
  };

  const toggleCheck = (id, checked) => {
    // Fix an ability to toggle task
    dispatch(toggleCompleteAsync({
      id: id,
      checked: !checked
    }))
  };

  //Pasamos el estado de nuestros todos del store y lo almacena en esta variable, que definimos en el slice
  const todos = useSelector((state)=>state.todos)

/*   const todos = [
    { id: 1, label: 'todo1', checked: false },
{ id: 2, label: 'todo2', checked: false },
{ id: 2, label: 'todo2', checked: false },
{ id: 2, label: 'todo2', checked: false },
{ id: 2, label: 'todo2', checked: false },
] */

//Traemos la funcion getTodoAsync del thunk, y hacemos que se muestre en pantalla siempre y cuando este funcionando bien el dispatch
  useEffect(()=>{
    dispatch(getTodoAsync())
  },[dispatch])

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      <div className="todo-list-content">
        {/* Fix an ability to render todos */}
        <ul className="list-group">
        {todos.map((todo) => (
            <TodoListItem id={todo.id} label={todo.label} checked={todo.checked} 
            onCheck={()=>toggleCheck(todo.id, todo.checked)}
            onDelete={()=>handleDelete(todo.id)}
            />
          ))}
        </ul>
      </div>
      <div className="no-todos">
        {todos.length === 0 && <p>Looks like you&apos;re absolutely free today!</p> }
      </div>
    </div>
  );
};

export default TodoList;
