import React, { useContext } from "react";
import Login from "./components/Login/Login";
import HomePage from "./components/Pages/HomePage";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={Login} />
        {authCtx.isLoggedIn && <Route path="/home" component={HomePage} />}
        {!authCtx.isLoggedIn && <Redirect to="/login" />}
      </Switch>
    </>
  );
}

export default App;
