import React, { useContext } from "react";
import Login from "./components/Login/Login";
import HomePage from "./components/Pages/HomePage";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import AuthContext from "./store/auth-context";
import UpdateProfilePage from "./components/Pages/UpdateProfilePage";
import CheckProfile from "./components/Pages/CheckProfile";
import ForgotPassword from "./components/Login/ForgotPassword";

function App() {
  const authCtx = useContext(AuthContext);

  

  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        {authCtx.isLoggedIn && <Route path="/home" exact component={HomePage} />}
        {authCtx.isLoggedIn && <Route path="/updateProfile" component={UpdateProfilePage} />}
        {authCtx.isLoggedIn && <Route path="/checkProfile" component={CheckProfile} />}
        <Route path="/forgot-password" component={ForgotPassword} />
        <Redirect from="/" to="/login" />
      </Switch>
    </>
  );
}

export default App;
