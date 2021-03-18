import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./shared/context/authContext";
import PublicHeader from "./components/PublicHeader";
import SignUpApi from "./pages/SignUpApi";
import PrivateHeader from "./components/PrivateHeader";
import PrivateHome from "./pages/PrivateHome";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/loggeduser">
            <PrivateHeader></PrivateHeader>
            <PrivateHome></PrivateHome>
          </Route>
          <Route path="/register">
            <SignUpApi></SignUpApi>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/">
            <PublicHeader></PublicHeader>
            <Home></Home>
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
