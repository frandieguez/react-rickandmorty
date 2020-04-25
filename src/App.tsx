import * as React from "react";
import "./App.css";
import { NavLink } from "react-router-dom";
import Routes from "./Routes";

const App = () => {
  return (
    <div>
      <div className="nav-bar">
        <NavLink className="link" activeClassName="active" exact to="/">
          Index
        </NavLink>
        <NavLink
          className="link
        "
          activeClassName="active"
          to="/favs"
        >
          Favorites
        </NavLink>
        <NavLink className="link" activeClassName="active" to="/login">
          Login
        </NavLink>
      </div>
      <Routes />
    </div>
  );
};

export default App;
