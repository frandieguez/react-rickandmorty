import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home/HomePage";
import FavPage from "./components/favs/FavPage";
import LoginPage from "./components/login/LoginPage";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/favs" component={FavPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  );
};
export default Routes;
