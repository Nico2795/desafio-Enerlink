import React from "react";
import "./styles.css";

const TodoListItem = ({ onCheck, checked, onDelete, label }) => {
  return(
    <li className="list-group mb-2">
    <div className="todo-list-item">
        <div
          tabIndex="0"
          role="checkbox"
          aria-checked
          className="todo-list-item-content"
        >
          <input
            className="form-check-input"
            tabIndex="-1"
            type="checkbox"
            checked={checked}
            onChange={onCheck}
            
            
          />
          <span className={checked ? "todo-list-item-checked " : "none"}>{label}</span>
        </div>
        <button type="button" className="btn btn-danger todo-list-item-delete" onClick={onDelete}>
          Delete
        </button>
      </div>
      </li>
  )
    };


export default TodoListItem;

//LAbel es title, checked es complete
