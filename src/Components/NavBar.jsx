import React from "react";
import "./NavBar.css";
import Button from "@mui/material/Button";
import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <nav className="navBar">
      <div className="navBar-logo">
        <img src={logo} alt="Logo" width="50px" />
        <span className="navBar-title">DocChain</span>
      </div>

      <Button size="small" variant="contained" color="primary">
        Login In
      </Button>
    </nav>
  );
};

export default NavBar;
