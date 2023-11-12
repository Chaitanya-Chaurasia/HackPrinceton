import { useState } from "react";
import "./App.css";
import { TextField } from "@mui/material";
import NavBar from "./Components/NavBar";
import Hero from "./Components/Hero";
import InfoSection from "./Components/InfoSection";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <NavBar />
      {/* Hero Section */}
      <Hero />
      {/* Info Section */}
      <InfoSection />
      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
