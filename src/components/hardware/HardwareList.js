import React from "react";
import { useState } from "react";
import { red, blue } from "@mui/material/colors";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "@mui/material/Button";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const HardwareList = ({
  hardwares,
  completeHardware,
  editHardware,
  deleteHardware,
  deleteChecked,
  saveHardware,
  noteRef,
  preventSubmit,
}) => {
  const [checked, setChecked] = useState([0]);
  let UniqKey = 123;

  const handleToggle = (value, inx) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    completeHardware(inx);
  };

  return (
    <>
      <List>
        {hardwares.map((hardware, inx) => {
          const labelId = `list-todo-${hardware}`;

          return (
            <ListItem key={`todo-${UniqKey++}`} role={undefined} dense button>
              <ListItemIcon>
                <Checkbox
                  sx={{
                    color: blue[800],
                    "&.Mui-checked": {
                      color: red[600],
                    },
                  }}
                  edge="start"
                  checked={checked.indexOf(hardware) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                  onClick={handleToggle(hardware, inx)}
                  onKeyPress={preventSubmit}
                  style={{
                    marginLeft: "5px",
                  }}
                />
              </ListItemIcon>
              {!hardware.isEditing ? (
                <>
                  <ListItemText
                    id={labelId}
                    className="form__list-text"
                    primary={`${hardware.text}`}
                    style={{
                      color: "black",
                      opacity: hardware.isCompleted ? "0.35" : undefined,
                    }}
                  />
                  <ListItemIcon>
                    <IconButton
                      className="editButton"
                      style={{ color: "#006600", marginRight: "5px" }}
                      edge="end"
                      aria-label="edit"
                      onClick={() => editHardware(inx)}
                    >
                      <EditIcon />
                    </IconButton>
                  </ListItemIcon>
                </>
              ) : (
                <>
                  <label
                    htmlFor="task" // better accessibility with HTML
                    className="visuallyhidden"
                  >
                    {hardware.text}
                  </label>
                  <input
                    className="form__edit-input"
                    defaultValue={hardware.text}
                    ref={(element) => (noteRef.current[inx] = element)}
                    onKeyPress={preventSubmit}
                    id="task"
                  />
                  <ListItemIcon>
                    <IconButton
                      onClick={() => saveHardware(inx)}
                      edge="end"
                      style={{ color: "#006600" }}
                      aria-label="delete"
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  </ListItemIcon>
                </>
              )}
              <ListItemSecondaryAction>
                <IconButton
                  className="deleteButton"
                  onClick={() => deleteHardware(inx)}
                  edge="end"
                  style={{ color: "#cc0000", marginRight: "5px" }}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          color="error"
          endIcon={<CheckBoxIcon />}
          style={{
            backgroundColor: "red",
            color: "white",
            fontWeight: "700",
            borderRadius: "18px",
          }}
          onClick={() => deleteChecked(hardwares)}
        >
          Delete
        </Button>
      </div>
    </>
  );
};

export default HardwareList;
