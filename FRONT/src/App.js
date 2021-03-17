import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import PrivateComponent from "./components/PrivateComponent";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./shared/context/authContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <PrivateComponent>
          <Header></Header>
        </PrivateComponent>
        <Switch>
          <Route path="/login">
            <PublicRoute>
              <Login></Login>
            </PublicRoute>
          </Route>
          <Route exact path="/">
            <PrivateRoute>
              <Home></Home>
            </PrivateRoute>
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
