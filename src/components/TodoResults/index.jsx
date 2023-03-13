import React from "react";
import "./styles.css";
import { useSelector } from "react-redux";

const TodoResults = () => {
  // Fix an ability to calculate completed tasks
  //Selecciona todos mis todos y los filtra los que están seleccionados
  const completedTodo = useSelector((state)=> state.todos.filter((todo)=>todo.checked))

  return <div className="todo-results">Done: {completedTodo.length}</div>;
};

export default TodoResults;
