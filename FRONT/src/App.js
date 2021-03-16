import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { AuthProvider } from "./shared/context/authContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
