import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./shared/context/authContext";
import PublicHeader from "./components/PublicHeader";
import SignUpApi from "./pages/SignUpApi";
import PrivateHeader from "./components/PrivateHeader";
import PrivateHome from "./pages/PrivateHome";
import Footer from "./components/Footer";
import { Global } from "@emotion/react";
import UserForm from "./components/UserForm";
import MasComentados from "./components/MasComentados";
import MasVotados from "./components/MasVotados";
import MisLinks from "./components/MisLinks";
import NuevoLink from "./components/NuevoLink";

function App() {
  return (
    <Router>
      <Global />
      <AuthProvider>
        <Switch>
          <Route path="/nuevolink">
            <PrivateHeader></PrivateHeader>
            <NuevoLink></NuevoLink>
          </Route>
          <Route path="/mislinks">
            <PrivateHeader></PrivateHeader>
            <MisLinks></MisLinks>
          </Route>
          <Route path="/masvotados">
            <PrivateHeader></PrivateHeader>
            <MasVotados></MasVotados>
          </Route>
          <Route path="/mascomentados">
            <PrivateHeader></PrivateHeader>
            <MasComentados></MasComentados>
          </Route>
          <Route path="/usersarea">
            <PrivateHeader></PrivateHeader>
            <UserForm></UserForm>
          </Route>
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
        <Footer></Footer>
      </AuthProvider>
    </Router>
  );
}

export default App;
