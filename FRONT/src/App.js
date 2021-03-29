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
import MasComentados from "./components/MasComentados";
import MasVotados from "./components/MasVotados";
import FindUsers from "./components/FindUsers";
import FindComments from "./components/FindComments";
import FindPosts from "./components/FindPosts";
import UserInfo from "./pages/UserInfo";
import NewPost from "./components/NewPost";
import NewPassword from "./components/NewPassword";
import EscapeSignUp from "./components/EscapeSignUp";
import EscapeHome from "./components/EscapeHome";
import EditPassword from "./components/EditPassword";
import ResetPassword from "./components/ResetPassword";
import ListUsers from "./components/ListUsers";
import UserPosts from "./components/UserPosts";
import EditUserProfile from "./components/EditUserProfile";
import ListComments from "./components/ListComments";
import UserComments from "./components/UserComments";
import LinkDetails from "./components/LinkDetails";
import UserDetails from "./components/UserDetails";
import CommentDetails from "./components/CommentDetails";

function App() {
  return (
    <Router>
      <Global />
      <AuthProvider>
        <Switch>
          <Route path="/findposts">
            <PrivateHeader></PrivateHeader>
            <FindPosts></FindPosts>
          </Route>
          <Route path="/findcomments">
            <PrivateHeader></PrivateHeader>
            <FindComments></FindComments>
            <ListComments></ListComments>
          </Route>
          <Route path="/findusers">
            <PrivateHeader></PrivateHeader>
            <FindUsers></FindUsers>
            <ListUsers></ListUsers>
          </Route>
          <Route path="/nuevolink">
            <PrivateHeader></PrivateHeader>
            <NewPost></NewPost>
          </Route>
          <Route path="/mislinks">
            <PrivateHeader></PrivateHeader>
            <UserPosts></UserPosts>
          </Route>
          <Route path="/masvotados">
            <PrivateHeader></PrivateHeader>
            <MasVotados></MasVotados>
          </Route>
          <Route path="/miscomentarios">
            <PrivateHeader></PrivateHeader>
            <MasComentados></MasComentados>
            <UserComments></UserComments>
          </Route>
          <Route path="/editpassword">
            <PrivateHeader></PrivateHeader>
            <EditPassword></EditPassword>
          </Route>
          <Route path="/edituser">
            <PrivateHeader></PrivateHeader>
            <EditUserProfile></EditUserProfile>
          </Route>
          <Route path="/user/:id">
            <PrivateHeader></PrivateHeader>
            <UserDetails></UserDetails>
          </Route>
          <Route path="/comment/:id">
            <PrivateHeader></PrivateHeader>
            <CommentDetails></CommentDetails>
          </Route>
          <Route path="/link/:id">
            <PrivateHeader></PrivateHeader>
            <LinkDetails></LinkDetails>
          </Route>
          <Route path="/usersarea">
            <PrivateHeader></PrivateHeader>
            <UserInfo></UserInfo>
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
            <NewPassword></NewPassword>
            <ResetPassword> </ResetPassword>
            <EscapeSignUp></EscapeSignUp>
            <EscapeHome></EscapeHome>
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
