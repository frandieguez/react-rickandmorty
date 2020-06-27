import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/home/HomePage";
import GraphHome from "./components/home/GraphHome";
import FavPage from "./components/favs/FavPage";
import LoginPage from "./components/login/LoginPage";

// I have implemented this in a rought way... better to connect it to redux directly
let PrivateRoute: React.FC<any> = ({ path, component, ...rest }) => {
  let storage = localStorage.getItem("storage") || "{}";
  storage = JSON.parse(storage);

  if (storage && storage.hasOwnProperty("user")) {
    return <Route path={path} component={component} />;
  }

  alert("You must log in to access this route");
  return <Redirect to={"/login"} {...rest}></Redirect>;
};

const Routes: React.FC = () => {
  return (
    <Switch>
      {/* <PrivateRoute exact path="/" component={Home} /> */}
      <PrivateRoute exact path="/" component={GraphHome} />
      <PrivateRoute path="/favs" component={FavPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  );
};
export default Routes;
