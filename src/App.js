import React, { useContext } from "react";
import Login from "./components/Login/Login";
import HomePage from "./components/Pages/HomePage";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import AuthContext from "./store/auth-context";
import UpdateProfilePage from "./components/Pages/UpdateProfilePage";
import CheckProfile from "./components/Pages/CheckProfile";

function App() {
  const authCtx = useContext(AuthContext);
  const routes = [
    { path: "/", exact: true, component: <Redirect to="/login" /> },
    { path: "/login", component: <Login /> },
    { path: "/home", component: <HomePage /> },
    { path: "/updateProfile", component: <UpdateProfilePage /> },
    { path: "/checkProfile", component: <CheckProfile /> },
  ];

  return (
    <>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={() => {
              if (!authCtx.isLoggedIn && route.path !== "/login") {
                return <Redirect to="/login" />;
              }
              return route.component;
            }}
          />
        ))}
      </Switch>
    </>
  );
}

export default App;
