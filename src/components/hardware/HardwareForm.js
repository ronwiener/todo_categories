import React, { useState, useEffect, useRef } from "react";
import HardwareCreator from "./HardwareFormInput";
import HardwareList from "./HardwareList";

const HardwareForm = () => {
  const [newHardware, setNewHardware] = useState("");
  const [hardwares, setHardwares] = useState([]);
  const inputRef = useRef();
  const noteRef = useRef({});
  const [isInputEmpty, setInputEmpty] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addHardware(newHardware);
    clearInput();
    inputRef.current.focus();
  };

  const preventSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const addHardware = (text) => {
    if (text !== "") {
      hardwares.unshift({
        inx: hardwares.length + 1,
        isCompleted: false,
        text: text,
      });
      setHardwares(hardwares);
      console.log(hardwares);
      localStorage.setItem(
        "hardwares",
        JSON.stringify([...hardwares, { text }])
      );
    } else {
      setInputEmpty(true);
    }
  };

  const removeHardware = (inx) => {
    const newArr = [...hardwares];
    newArr.splice(inx, 1);
    localStorage.setItem("hardwares", JSON.stringify(newArr));
    setHardwares(newArr);
  };

  const deleteChecked = (hardwares) => {
    let updatedHardwares = [...hardwares].filter(
      (hardware) => !hardware.isCompleted
    );
    localStorage.setItem("hardwares", JSON.stringify(updatedHardwares));
    setHardwares(updatedHardwares);
  };

  const completeHardware = (inx) => {
    const hardware = hardwares[inx];
    console.log(hardwares);
    hardwares.splice(inx, 1);
    hardware.isCompleted = !hardware.isCompleted;
    hardware.isCompleted
      ? hardwares.push(hardware)
      : hardwares.unshift(hardware);
    setHardwares(hardwares);
    localStorage.setItem("hardwares", JSON.stringify(hardwares));
  };

  const editHardware = (inx) => {
    const newHardwares = [...hardwares];
    newHardwares[inx].isEditing = !newHardwares[inx].isEditing;
    setHardwares(newHardwares);
  };

  const saveHardware = (inx) => {
    const newHardwares = [...hardwares];
    newHardwares[inx].isEditing = !newHardwares[inx].isEditing;
    newHardwares[inx].text = noteRef.current[inx].value;
    setHardwares(newHardwares);
    localStorage.setItem("hardwares", JSON.stringify(newHardwares));
  };

  const clearInput = () => {
    setNewHardware("");
  };

  const setHardware = (hardware) => {
    setInputEmpty(false);
    setNewHardware(hardware);
  };

  useEffect(() => {
    const json = localStorage.getItem("hardwares");
    const saveHardwares = JSON.parse(json);
    if (saveHardwares) {
      setHardwares(saveHardwares);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="form">
      <HardwareCreator
        hardware={newHardware}
        setHardware={setHardware}
        clearInput={clearInput}
        inputRef={inputRef}
        isInputEmpty={isInputEmpty}
        preventSubmit={preventSubmit}
      />

      <HardwareList
        hardwares={hardwares}
        completeHardware={completeHardware}
        editHardware={editHardware}
        deleteHardware={removeHardware}
        deleteChecked={deleteChecked}
        saveHardware={saveHardware}
        noteRef={noteRef}
        preventSubmit={preventSubmit}
      />
    </form>
  );
};

export default HardwareForm;
