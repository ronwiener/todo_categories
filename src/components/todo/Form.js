import React, { useState, useEffect, useRef } from "react";
import TodoCreator from "./FormInput";
import TodoList from "./List";

const Form = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();
  const noteRef = useRef({});
  const [isInputEmpty, setInputEmpty] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(newTodo);
    clearInput();
    inputRef.current.focus();
  };

  const preventSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const addTodo = (text) => {
    /*  if (text !== "") {
      const newTodos = [...todos, { text }];
      setNewTodo("");
      localStorage.setItem("todos", JSON.stringify([...todos, { text }]));
      setTodos(newTodos);
    } else {
      console.log("text", text);
      setInputEmpty(true);
    }
  };
  */
    if (text !== "") {
      todos.unshift({
        inx: todos.length + 1,
        isCompleted: false,
        text: text,
      });
      setTodos(todos);
      localStorage.setItem("todos", JSON.stringify([...todos, { text }]));
    } else {
      setInputEmpty(true);
    }
  };
  const removeTodo = (inx) => {
    const newArr = [...todos];
    newArr.splice(inx, 1);
    localStorage.setItem("todos", JSON.stringify(newArr));
    setTodos(newArr);
  };

  const deleteChecked = (todos) => {
    let updatedTodos = [...todos].filter((todo) => !todo.isCompleted);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const completeTodo = (inx) => {
    /*  const newTodos = [...todos];
    console.log(newTodos);
    newTodos[inx].isCompleted = !newTodos[inx].isCompleted;
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    */
    const todo = todos[inx];
    todos.splice(inx, 1);
    todo.isCompleted = !todo.isCompleted;
    todo.isCompleted ? todos.push(todo) : todos.unshift(todo);
    setTodos(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const editTodo = (inx) => {
    const newTodos = [...todos];
    newTodos[inx].isEditing = !newTodos[inx].isEditing;
    setTodos(newTodos);
  };

  const saveTodo = (inx) => {
    const newTodos = [...todos];
    newTodos[inx].isEditing = !newTodos[inx].isEditing;
    newTodos[inx].text = noteRef.current[inx].value;
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const clearInput = () => {
    setNewTodo("");
  };

  const setTodo = (todo) => {
    setInputEmpty(false);
    setNewTodo(todo);
  };

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const savedTodos = JSON.parse(json);
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="form">
      <TodoCreator
        todo={newTodo}
        setTodo={setTodo}
        clearInput={clearInput}
        inputRef={inputRef}
        isInputEmpty={isInputEmpty}
        preventSubmit={preventSubmit}
      />

      <TodoList
        todos={todos}
        completeTodo={completeTodo}
        editTodo={editTodo}
        deleteTodo={removeTodo}
        deleteChecked={deleteChecked}
        saveTodo={saveTodo}
        noteRef={noteRef}
        preventSubmit={preventSubmit}
      />
    </form>
  );
};

export default Form;
