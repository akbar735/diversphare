import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MenuBar from "./components/navbar/MenuBar";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MenuBar />
      <Outlet />
    </Box>
  );
}
