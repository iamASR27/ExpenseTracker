import React, { lazy, Suspense } from "react";
// import Login from "./components/Login/Login";
// import HomePage from "./components/Pages/HomePage";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
// import UpdateProfilePage from "./components/Pages/UpdateProfilePage";
// import CheckProfile from "./components/Pages/CheckProfile";
// import ForgotPassword from "./components/Login/ForgotPassword";
// import NewExpense from "./components/NewExpense/NewExpense";
import { useSelector } from "react-redux";

const Login = lazy(() => import("./components/Login/Login"));
const HomePage = lazy(() => import("./components/Pages/HomePage"));
const UpdateProfilePage = lazy(() => import("./components/Pages/UpdateProfilePage"));
const CheckProfile = lazy(() => import("./components/Pages/CheckProfile"));
const ForgotPassword = lazy(() => import("./components/Login/ForgotPassword"));
const NewExpense = lazy(() => import("./components/NewExpense/NewExpense"));

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
    <Suspense fallback={
        <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    }>
      <Switch>
        <Route path="/login" component={Login} />
        {isLoggedIn && <Route path="/home" exact component={HomePage} />}
        {isLoggedIn && (
          <Route path="/updateProfile" component={UpdateProfilePage} />
        )}
        {isLoggedIn && <Route path="/checkProfile" component={CheckProfile} />}
        {isLoggedIn && <Route path="/expenses" component={NewExpense} />}
        <Route path="/forgot-password" component={ForgotPassword} />
        <Redirect from="/" to="/login" />
      </Switch>
      </Suspense>
    </>
  );
}

export default App;
