import React from "react";
import DrawerComponent from "./Drawer";
import { AppBar, Toolbar, CssBaseline, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./Navbar.css";
import { Outlet, Link } from "react-router-dom";

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar
        style={{
          backgroundImage: "linear-gradient(to right, #3499FF, #3A3985)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              paddingRight: matchesSM ? "75px" : "undefined",
              marginLeft: "auto",
              lineHeight: "1em",
              fontSize: matchesSM ? "1.25rem" : "1.5rem",
            }}
          >
            <Typography
              variant={matchesSM ? "1em" : "1em"}
              style={{ flexGrow: "1", textAlign: "center" }}
            >
              Get Things Done, <br />
            </Typography>
            <Typography
              variant={matchesSM ? "0.5em" : "0.8em"}
              style={{ flexGrow: "1", textAlign: "center" }}
            >
              one at a time
            </Typography>
          </div>
          {isMobile ? (
            <DrawerComponent />
          ) : (
            <div style={{ marginLeft: matchesSM ? "undefined" : "auto" }}>
              <Link to="/grocery" className="grocery">
                Grocery
              </Link>
              <Link to="/costco" className="costco">
                Costco
              </Link>
              <Link to="/todo" className="todo">
                To do
              </Link>
              <Link to="/hardware" className="hardware">
                Hardware
              </Link>
              <Link to="/misc" className="misc">
                Misc
              </Link>
            </div>
          )}
        </div>
      </Toolbar>
      <Outlet />
    </AppBar>
  );
}
export default Navbar;

//backgroundColor: "#3333cc" for navbar
