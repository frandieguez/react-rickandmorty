import * as React from "react";
import "./App.css";
import { NavLink } from "react-router-dom";
import Routes from "./Routes";
import { connect } from "react-redux";

const App: React.FC<{ loggedIn: boolean; displayName: string }> = ({
  loggedIn,
  displayName,
}) => {
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
          {loggedIn ? `Hi ${displayName}` : "Login"}
        </NavLink>
      </div>
      <Routes />
    </div>
  );
};

const mapState = (state: any) => {
  return { loggedIn: state.user.loggedIn, displayName: state.user.displayName };
};

export default connect(mapState, {})(App);
