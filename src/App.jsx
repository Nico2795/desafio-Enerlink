import React from "react";
import TodoList from "./components/TodoList";
import TodoResults from "./components/TodoResults";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoForm from "components/TodoForm";
import toast, { Toaster } from 'react-hot-toast';



const App = () => {
  return (
    <div className="root">
      <TodoList />
      <TodoResults />
      <TodoForm></TodoForm>
      <Toaster/>
    </div>
  );
};

export default App;
