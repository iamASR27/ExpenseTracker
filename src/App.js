import React from "react";
import Login from "./components/Login/Login";
import HomePage from "./components/Pages/HomePage";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
// import AuthContext from "./store/auth-context";
import UpdateProfilePage from "./components/Pages/UpdateProfilePage";
import CheckProfile from "./components/Pages/CheckProfile";
import ForgotPassword from "./components/Login/ForgotPassword";
import NewExpense from "./components/NewExpense/NewExpense";
import { useSelector } from "react-redux";

function App() {
  // const authCtx = useContext(AuthContext);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  

  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        {isLoggedIn && <Route path="/home" exact component={HomePage} />}
        {isLoggedIn && <Route path="/updateProfile" component={UpdateProfilePage} />}
        {isLoggedIn && <Route path="/checkProfile" component={CheckProfile} />}
        {isLoggedIn && <Route path="/expenses" component={NewExpense} />}
        <Route path="/forgot-password" component={ForgotPassword} />
        <Redirect from="/" to="/login" />
      </Switch>
    </>
  );
}

export default App;
