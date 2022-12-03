import React from "react";
import "./TodoItem.css";
import {
  FaRegCheckSquare,
  FaWindowClose,
  FaRegSquare,
  FaRegTrashAlt,
} from "react-icons/fa";

function TodoItem(props) {
  return (
    <li className="TodoItem">
      <span
        className={`Icon Icon-check ${
          props.completed ? "Icon-check--active" : "another-class"
        }`}
        onClick={!props.completed ? props.onComplete : props.unCheck}
      >
        {props.completed ? <FaRegCheckSquare /> : <FaRegSquare />}
      </span>
      <p className={`TodoItem-p ${props.completed && "TodoItem-p--complete"}`}>
        {props.text}
      </p>

      <span className="Icon Icon-delete" onClick={props.onDelete}>
        <FaRegTrashAlt />
      </span>
    </li>
  );
}

export { TodoItem };
