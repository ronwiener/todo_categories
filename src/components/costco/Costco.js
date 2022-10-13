import React from "react";
import CostcoForm from "./CostcoForm";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function Costco() {
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
            Costco List
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CostcoForm />
        </Grid>
      </Grid>
    </Box>
  );
}
export default Costco;
