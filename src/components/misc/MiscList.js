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
import "../Styles.css";

const MiscList = ({
  miscs,
  completeMisc,
  editMisc,
  deleteMisc,
  deleteChecked,
  saveMisc,
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
    completeMisc(inx);
  };

  return (
    <>
      <List>
        {miscs.map((misc, inx) => {
          const labelId = `list-todo-${misc}`;

          return (
            <ListItem
              key={`todo-${UniqKey++}`}
              role={undefined}
              dense
              button
              style={{
                backgroundColor: "#e0fbfc",
                boxShadow: "0 0 1px black",
              }}
            >
              <ListItemIcon>
                <Checkbox
                  sx={{
                    color: blue[800],
                    "&.Mui-checked": {
                      color: red[600],
                    },
                  }}
                  edge="start"
                  checked={checked.indexOf(misc) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                  onClick={handleToggle(misc, inx)}
                  onKeyPress={preventSubmit}
                  style={{
                    marginLeft: "5px",
                  }}
                />
              </ListItemIcon>
              {!misc.isEditing ? (
                <>
                  <ListItemText
                    id={labelId}
                    className="form__list-text"
                    primary={`${misc.text}`}
                    primaryTypographyProps={{ fontSize: "19px" }}
                    style={{
                      color: "black",
                      opacity: misc.isCompleted ? "0.35" : undefined,
                    }}
                  />
                  <ListItemIcon>
                    <IconButton
                      className="editButton"
                      style={{ color: "#00897b", marginRight: "5px" }}
                      edge="end"
                      aria-label="edit"
                      onClick={() => editMisc(inx)}
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
                    {misc.text}
                  </label>
                  <input
                    className="form__edit-input"
                    defaultValue={misc.text}
                    ref={(element) => (noteRef.current[inx] = element)}
                    onKeyPress={preventSubmit}
                    id="task"
                  />
                  <ListItemIcon>
                    <IconButton
                      onClick={() => saveMisc(inx)}
                      edge="end"
                      style={{ color: "#00897b" }}
                      aria-label="save"
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  </ListItemIcon>
                </>
              )}
              <ListItemSecondaryAction>
                <IconButton
                  className="deleteButton"
                  onClick={() => deleteMisc(inx)}
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
          onClick={() => deleteChecked(miscs)}
        >
          Delete
        </Button>
      </div>
    </>
  );
};

export default MiscList;
