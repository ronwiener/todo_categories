import React from "react";
import GroceryForm from "./GroceryForm";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function Grocery() {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#5fa8d3" }}>
      <Grid container direction="column">
        <Grid item>
          <Typography
            style={{
              textAlign: "center",
              fontSize: matchesSM ? "20px" : "28px",
              textDecoration: "none",
              letterSpacing: "2px",
              padding: "3px",
              fontWeight: "700",
            }}
          >
            Grocery List
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <GroceryForm />
        </Grid>
      </Grid>
    </Box>
  );
}
export default Grocery;
