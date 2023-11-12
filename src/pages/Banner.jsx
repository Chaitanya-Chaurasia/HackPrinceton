import React from "react";
import logo from "../images/logo.png"; // Replace with the path to your logo image
import "./Header.css"; // This will be the CSS file for the Header styles
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="DocChain Logo" className="logo" />
      </Link>
    </header>
  );
};

export default Banner;
