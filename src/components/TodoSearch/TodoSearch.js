import React from "react";
import { TodoContext } from "../../TodoContext/TodoContext";
import "./TodoSearch.css";

function TodoSearch() {
  const { searhValue, setSearchValue } = React.useContext(TodoContext);

  const onSearchValueChange = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  return (
    <input
      className="TodoSearch"
      placeholder="Buscar tarea"
      value={searhValue}
      onChange={onSearchValueChange}
    />
  );
}

export { TodoSearch };
