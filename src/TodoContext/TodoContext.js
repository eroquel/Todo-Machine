import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props) {
  // Nos traemos todo el estado y las funciones de nuestra aplicación que queremos que sean globales
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);

  const [searhValue, setSearchValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  /* Condicional para que los todos aparescan o no dependiendo de lo que se escriba en el todoSearch, buscador*/
  if (!searhValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searhValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }
  /** */

  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.unshift({
      text,
      completed: false,
    });
    saveTodos(newTodos);
  };

  /*Función que permite que al hacer click en el check de un Todo, este se marque como completado*/
  const completeTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    /*const newTodos = [...todos]; esto es unicamente para hacer un duplicado de todos, llamado newTodos*/
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);

    newTodos.push({
      text,
      completed: true,
    });

    saveTodos(newTodos);
  };
  /**/

  const unCheckTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    /*const newTodos = [...todos]; esto es unicamente para hacer un duplicado de todos, llamado newTodos*/
    const newTodos = [...todos];
    newTodos[todoIndex].completed = false;
    saveTodos(newTodos);
  };

  /*Función permite eliminar un Todo/Tarea que al hacer click en el icono X*/
  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };
  /** */
  // Retornamos nuestro proveedor con nuestro contexto en la etiqueta value, que recibirá a toda nuestra aplicación, por eso necesitamos la prop children
  return (
    <TodoContext.Provider
      value={{
        error,
        loading,
        totalTodos,
        completedTodos,
        searhValue,
        setSearchValue,
        addTodo,
        searchedTodos,
        completeTodo,
        unCheckTodo,
        deleteTodo,
        openModal,
        setOpenModal,
        todos,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
