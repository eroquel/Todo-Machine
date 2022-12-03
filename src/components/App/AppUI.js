import React from "react";

import { TodoContext } from "../../TodoContext/TodoContext";
import { TodoCounter } from "../TodoCounter/TodoCounter";
import { TodoSearch } from "../TodoSearch/TodoSearch";
import { TodoList } from "../TodoList/TodoList";
import { TodoItem } from "../TodoItem/TodoItem";
import { CreateTodoButton } from "../CreateTodoButton/CreateTodoButton";
import { Modal } from "../Modal/Modal";
import { TodoForm } from "../TodoForm/TodoForm";
import ContentLoader, { Facebook } from "react-content-loader";
import { FaCheck } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";

function AppUI() {
  const {
    error,
    loading,
    searchedTodos,
    completeTodo,
    unCheckTodo,
    deleteTodo,
    openModal,
    setOpenModal,
  } = React.useContext(TodoContext);
  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />

      {/* Podemos acceder a nuestro contexto con el consumer */}

      <TodoList>
        {error && (
          <div className="no-todo todo-message">
            <div className="todo-message__icon  todo-message__icon--alert">
              <BiErrorCircle />
            </div>
            <div className="todo-message__icon  todo-message__icon--alert">
              <BiErrorCircle />
            </div>
            <p>Ups, hubo un error...</p>
          </div>
        )}
        {loading && (
          <div className="no-todo todo-message">
            <p>Cargando Tareas...</p>
            <ContentLoader speed={2} width={600} height={400}>
              <rect x="25" y="0" ry="5" width={550} height={70} />
              <rect x="25" y="100" ry="5" width={550} height={70} />
              <rect x="25" y="200" ry="5" width={550} height={70} />
            </ContentLoader>
          </div>
        )}
        {!loading && !searchedTodos.length && (
          <div className="no-todo todo-message">
            <div className="todo-message__icon  todo-message__icon--green">
              <FaCheck />
            </div>
            <p>¡Excelente!, no tienes tareas pendientes.</p>
          </div>
        )}

        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            unCheck={() => unCheckTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>
      {!!openModal && (
        <Modal>
          <TodoForm></TodoForm>
        </Modal>
      )}
      <CreateTodoButton setOpenModal={setOpenModal} />
    </React.Fragment>
  );
}

export { AppUI };
