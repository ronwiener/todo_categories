import React, { useState, useEffect, useRef } from "react";
import GroceryCreator from "./GroceryFormInput";
import GroceryList from "./GroceryList";

const GroceryForm = () => {
  const [newGrocery, setNewGrocery] = useState("");
  const [groceries, setGroceries] = useState([]);
  const inputRef = useRef();
  const noteRef = useRef({});
  const [isInputEmpty, setInputEmpty] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addGrocery(newGrocery);
    clearInput();
    inputRef.current.focus();
  };

  const preventSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const addGrocery = (text) => {
    if (text !== "") {
      groceries.unshift({
        inx: groceries.length + 1,
        isCompleted: false,
        text: text,
      });
      setGroceries(groceries);
      console.log(groceries);
      localStorage.setItem("groceries", JSON.stringify([...groceries]));
    } else {
      setInputEmpty(true);
    }
  };

  const removeGrocery = (inx) => {
    const newArr = [...groceries];
    newArr.splice(inx, 1);
    localStorage.setItem("groceries", JSON.stringify(newArr));
    setGroceries(newArr);
  };

  const deleteChecked = (groceries) => {
    let updatedGroceries = [...groceries].filter(
      (grocery) => !grocery.isCompleted
    );
    localStorage.setItem("groceries", JSON.stringify(updatedGroceries));
    setGroceries(updatedGroceries);
  };

  const completeGrocery = (inx) => {
    const grocery = groceries[inx];
    console.log(groceries);
    groceries.splice(inx, 1);
    grocery.isCompleted = !grocery.isCompleted;
    grocery.isCompleted ? groceries.push(grocery) : groceries.unshift(grocery);
    setGroceries(groceries);
    localStorage.setItem("groceries", JSON.stringify(groceries));
  };

  const editGrocery = (inx) => {
    const newGroceries = [...groceries];
    newGroceries[inx].isEditing = !newGroceries[inx].isEditing;
    setGroceries(newGroceries);
  };

  const saveGrocery = (inx) => {
    const newGroceries = [...groceries];
    newGroceries[inx].isEditing = !newGroceries[inx].isEditing;
    newGroceries[inx].text = noteRef.current[inx].value;
    setGroceries(newGroceries);
    localStorage.setItem("groceries", JSON.stringify(newGroceries));
  };

  const clearInput = () => {
    setNewGrocery("");
  };

  const setGrocery = (grocery) => {
    setInputEmpty(false);
    setNewGrocery(grocery);
  };

  useEffect(() => {
    const json = localStorage.getItem("groceries");
    const savedGroceries = JSON.parse(json);
    if (savedGroceries) {
      setGroceries(savedGroceries);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="form">
      <GroceryCreator
        grocery={newGrocery}
        setGrocery={setGrocery}
        clearInput={clearInput}
        inputRef={inputRef}
        isInputEmpty={isInputEmpty}
        preventSubmit={preventSubmit}
      />

      <GroceryList
        groceries={groceries}
        completeGrocery={completeGrocery}
        editGrocery={editGrocery}
        deleteGrocery={removeGrocery}
        deleteChecked={deleteChecked}
        saveGrocery={saveGrocery}
        noteRef={noteRef}
        preventSubmit={preventSubmit}
      />
    </form>
  );
};

export default GroceryForm;
