import React from "react";
import { TodoContext } from "../../TodoContext/TodoContext";
import "./TodoForm.css";

function TodoForm() {
  const [newTodoValue, settNewTodoValue] = React.useState("");
  const [message, setMessage] = React.useState("");
  const { addTodo, setOpenModal, todos } = React.useContext(TodoContext);
  const onWrite = (event) => {
    settNewTodoValue(event.target.value);
  };

  // Hice una función para que recorriera cada TODO y devuelva true si el TODO a agregar ya existe.
  const alreadyExist = () => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].text === newTodoValue) {
        return true;
      }
    }
  };

  // Agregué la validación a la funcion onAddTodo
  const onAddTodo = (event) => {
    event.preventDefault();
    if (newTodoValue.length <= 0) {
      event.target[0].attributes[0].value =
        "Debes escribir una tarea para agregarla";
      event.target[0].className = "form-empty";
    } else if (alreadyExist()) {
      setMessage("Esta tarea ya existe");
    } else if (newTodoValue.length <= 3) {
      setMessage("Esta no parece una tarea");
      event.target[0].className = "form-empty";
    } else {
      addTodo(newTodoValue);
      setOpenModal(false);
    }
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  return (
    <form onSubmit={onAddTodo}>
      <label>Escribe tu nueva tarea</label>
      <h5>{message}</h5>
      <textarea
        value={newTodoValue}
        onChange={onWrite}
        placeholder="Nueva tarea"
      />

      <div className="TodoForm-buttonContainer">
        <button
          className="TodoForm-button TodoForm-button--cancel"
          type="button"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button className="TodoForm-button TodoForm-button--add" type="submit">
          Agregar
        </button>
      </div>
    </form>
  );
}

export { TodoForm };
