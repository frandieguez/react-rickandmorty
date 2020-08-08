import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const Home = lazy(() => import("./components/home/HomePage"));
const GraphHome = lazy(() => import("./components/home/GraphHomePage"));
const FavPage = lazy(() => import("./components/favs/FavPage"));
const LoginPage = lazy(() => import("./components/login/LoginPage"));

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
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        {/* <PrivateRoute exact path="/" component={GraphHome} /> */}
        <PrivateRoute path="/favs" component={FavPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Suspense>
  );
};
export default Routes;
