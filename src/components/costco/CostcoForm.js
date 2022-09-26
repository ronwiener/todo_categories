import React, { useState, useEffect, useRef } from "react";
import CostcoCreator from "./CostcoFormInput";
import CostcoList from "./CostcoList";

const CostcoForm = () => {
  const [newCostco, setNewCostco] = useState("");
  const [costcos, setCostcos] = useState([]);
  const inputRef = useRef();
  const noteRef = useRef({});
  const [isInputEmpty, setInputEmpty] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addCostco(newCostco);
    clearInput();
    inputRef.current.focus();
  };

  const preventSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const addCostco = (text) => {
    if (text !== "") {
      costcos.unshift({
        inx: costcos.length + 1,
        isCompleted: false,
        text: text,
      });
      setCostcos(costcos);
      console.log(costcos);
      localStorage.setItem("costcos", JSON.stringify([...costcos, { text }]));
    } else {
      setInputEmpty(true);
    }
  };

  const removeCostco = (inx) => {
    const newArr = [...costcos];
    newArr.splice(inx, 1);
    localStorage.setItem("costcos", JSON.stringify(newArr));
    setCostcos(newArr);
  };

  const deleteChecked = (costcos) => {
    let updatedCostcos = [...costcos].filter((costco) => !costco.isCompleted);
    localStorage.setItem("costcos", JSON.stringify(updatedCostcos));
    setCostcos(updatedCostcos);
  };

  const completeCostco = (inx) => {
    const costco = costcos[inx];
    console.log(costcos);
    costcos.splice(inx, 1);
    costco.isCompleted = !costco.isCompleted;
    costco.isCompleted ? costcos.push(costco) : costcos.unshift(costco);
    setCostcos(costcos);
    localStorage.setItem("costcos", JSON.stringify(costcos));
  };

  const editCostco = (inx) => {
    const newCostcos = [...costcos];
    newCostcos[inx].isEditing = !newCostcos[inx].isEditing;
    setCostcos(newCostcos);
  };

  const saveCostco = (inx) => {
    const newCostcos = [...costcos];
    newCostcos[inx].isEditing = !newCostcos[inx].isEditing;
    newCostcos[inx].text = noteRef.current[inx].value;
    setCostcos(newCostcos);
    localStorage.setItem("costcos", JSON.stringify(newCostcos));
  };

  const clearInput = () => {
    setNewCostco("");
  };

  const setCostco = (costco) => {
    setInputEmpty(false);
    setNewCostco(costco);
  };

  useEffect(() => {
    const json = localStorage.getItem("costcos");
    const savedCostcos = JSON.parse(json);
    if (savedCostcos) {
      setCostcos(savedCostcos);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="form">
      <CostcoCreator
        costco={newCostco}
        setCostco={setCostco}
        clearInput={clearInput}
        inputRef={inputRef}
        isInputEmpty={isInputEmpty}
        preventSubmit={preventSubmit}
      />

      <CostcoList
        costcos={costcos}
        completeCostco={completeCostco}
        editCostco={editCostco}
        deleteCostco={removeCostco}
        deleteChecked={deleteChecked}
        saveCostco={saveCostco}
        noteRef={noteRef}
        preventSubmit={preventSubmit}
      />
    </form>
  );
};

export default CostcoForm;
