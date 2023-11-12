import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";

function Header() {
  const [top, setTop] = useState(true);

  // detect whether the user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 transition duration-300 ease-in-out ${
        !top
          ? "bg-gradient-to-r from-purple-300 to-indigo-300"
          : "bg-gradient-to-r from-purple-400 to-indigo-500"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-center h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              <img src={Logo} alt="Logo" className="h-14 w-auto" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
