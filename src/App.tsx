// App.js
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.scss";

const App = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="logo">Your Logo</div>
        <nav className="navigation">
          <ul className="desktop-menu navigation-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/stats">Stats</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
          <div className="menu-icon" onClick={toggleMobileMenu}>
            ☰
          </div>
        </nav>
      </header>
      {showMobileMenu && (
        <div className="mobile-menu">
          <div className="overlay" onClick={toggleMobileMenu}></div>
          <div className="menu-content">
            <ul className="navigation-links">
              <li>
                <Link to="/" onClick={toggleMobileMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" onClick={toggleMobileMenu}>
                  Search
                </Link>
              </li>
              <li>
                <Link to="/stats" onClick={toggleMobileMenu}>
                  Stats
                </Link>
              </li>
              <li>
                <Link to="/profile" onClick={toggleMobileMenu}>
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="content">
        <Routes>
          <Route path="/" element={<h2>Home</h2>} />
          <Route path="/search" element={<h2>Search</h2>} />
          <Route path="/stats" element={<h2>Stats</h2>} />
          <Route path="/profile" element={<h2>Profile</h2>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
