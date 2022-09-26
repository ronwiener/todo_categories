import React, { useState, useEffect, useRef } from "react";
import MiscCreator from "./MiscFormInput";
import MiscList from "./MiscList";

const MiscForm = () => {
  const [newMisc, setNewMisc] = useState("");
  const [miscs, setMiscs] = useState([]);
  const inputRef = useRef();
  const noteRef = useRef({});
  const [isInputEmpty, setInputEmpty] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addMisc(newMisc);
    clearInput();
    inputRef.current.focus();
  };

  const preventSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const addMisc = (text) => {
    if (text !== "") {
      miscs.unshift({
        inx: miscs.length + 1,
        isCompleted: false,
        text: text,
      });
      setMiscs(miscs);
      console.log(miscs);
      localStorage.setItem("miscs", JSON.stringify([...miscs, { text }]));
    } else {
      setInputEmpty(true);
    }
  };

  const removeMisc = (inx) => {
    const newArr = [...miscs];
    newArr.splice(inx, 1);
    localStorage.setItem("miscs", JSON.stringify(newArr));
    setMiscs(newArr);
  };

  const deleteChecked = (miscs) => {
    let updatedMiscs = [...miscs].filter((misc) => !misc.isCompleted);
    localStorage.setItem("miscs", JSON.stringify(updatedMiscs));
    setMiscs(updatedMiscs);
  };

  const completeMisc = (inx) => {
    const misc = miscs[inx];
    console.log(miscs);
    miscs.splice(inx, 1);
    misc.isCompleted = !misc.isCompleted;
    misc.isCompleted ? miscs.push(misc) : miscs.unshift(misc);
    setMiscs(miscs);
    localStorage.setItem("miscs", JSON.stringify(miscs));
  };

  const editMisc = (inx) => {
    const newMiscs = [...miscs];
    newMiscs[inx].isEditing = !newMiscs[inx].isEditing;
    setMiscs(newMiscs);
  };

  const saveMisc = (inx) => {
    const newMiscs = [...miscs];
    newMiscs[inx].isEditing = !newMiscs[inx].isEditing;
    newMiscs[inx].text = noteRef.current[inx].value;
    setMiscs(newMiscs);
    localStorage.setItem("miscs", JSON.stringify(newMiscs));
  };

  const clearInput = () => {
    setNewMisc("");
  };

  const setMisc = (misc) => {
    setInputEmpty(false);
    setNewMisc(misc);
  };

  useEffect(() => {
    const json = localStorage.getItem("miscs");
    const savedMiscs = JSON.parse(json);
    if (savedMiscs) {
      setMiscs(savedMiscs);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="form">
      <MiscCreator
        misc={newMisc}
        setMisc={setMisc}
        clearInput={clearInput}
        inputRef={inputRef}
        isInputEmpty={isInputEmpty}
        preventSubmit={preventSubmit}
      />

      <MiscList
        miscs={miscs}
        completeMisc={completeMisc}
        editMisc={editMisc}
        deleteMisc={removeMisc}
        deleteChecked={deleteChecked}
        saveMisc={saveMisc}
        noteRef={noteRef}
        preventSubmit={preventSubmit}
      />
    </form>
  );
};

export default MiscForm;
