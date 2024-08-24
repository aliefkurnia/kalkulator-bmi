import React, { useEffect, useState } from "react";
import "./header.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <h1 className="logo">Health Calculator</h1>
        <nav className="nav">
          <a href="#bmi" className="nav-link">
            BMI Calculator
          </a>
          <a href="#broca" className="nav-link">
            Broca Index
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
