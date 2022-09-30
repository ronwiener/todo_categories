import React, { useState } from "react";
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

const TodoList = ({
  todos,
  completeTodo,
  editTodo,
  deleteTodo,
  saveTodo,
  deleteChecked,
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
    completeTodo(inx);
  };
  return (
    <>
      <List>
        {todos.map((todo, inx) => {
          const labelId = `list-todo-${todo}`;
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
                  checked={checked.indexOf(todo) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                  onClick={handleToggle(todo, inx)}
                  onKeyPress={preventSubmit}
                  style={{
                    marginLeft: "5px",
                  }}
                />
              </ListItemIcon>
              {!todo.isEditing ? (
                <>
                  <ListItemText
                    label={labelId}
                    className="form__list-text"
                    primary={`${todo.text}`}
                    style={{
                      color: "black",
                      opacity: todo.isCompleted ? "0.35" : "bold",
                    }}
                  />
                  <ListItemIcon>
                    <IconButton
                      className="editButton"
                      style={{ color: "#006600", marginRight: "5px" }}
                      edge="end"
                      aria-label="edit"
                      onClick={() => editTodo(inx)}
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
                    {todo.text}
                  </label>

                  <input
                    className="form__edit-input"
                    defaultValue={todo.text}
                    ref={(element) => (noteRef.current[inx] = element)}
                    onKeyPress={preventSubmit}
                    id="task"
                  />
                  <ListItemIcon>
                    <IconButton
                      onClick={() => saveTodo(inx)}
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
                  onClick={() => deleteTodo(inx)}
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
          onClick={() => deleteChecked(todos)}
        >
          Delete
        </Button>
      </div>
    </>
  );
};

export default TodoList;
