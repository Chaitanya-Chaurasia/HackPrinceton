import { useState } from "react";
import "./App.css";
import { TextField } from "@mui/material";
import NavBar from "./Components/NavBar";
import Hero from "./Components/Hero";

function App() {
  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <Hero />
      {/* Buttons */}
      {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" /> */}
    </>
  );
}

export default App;
