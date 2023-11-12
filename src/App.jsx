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
      {/* Info Section */}
    </>
  );
}

export default App;
