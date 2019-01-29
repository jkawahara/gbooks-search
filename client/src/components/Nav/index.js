// *** Include Modules: npm (react)
import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Google Books
      </a>
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>
              Search Books
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/savedbooks"
              className={window.location.pathname === "/savedbooks" ? "nav-link active" : "nav-link"}
            >
              Saved Books
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// Export function for importing into /pages
export default Nav;
