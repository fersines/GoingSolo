import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./shared/context/authContext";
import SignUpApi from "./pages/SignUpApi";
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
import DeleteUser from "./components/DeleteUser";
import DeleteComment from "./components/DeleteComment";
import EditLink from "./components/EditLink";
import LinkInfo from "./pages/LinkInfo";
import DeleteLink from "./components/DeleteLink";
import SignUpForm from "./components/SignUpForm";
import Header from "./pages/Header";

function App() {
  return (
    <Router>
      <Global />
      <AuthProvider>
        <Header></Header>
        <Switch>
          <Route path="/findposts">
            <FindPosts></FindPosts>
          </Route>
          <Route path="/findcomments">
            <FindComments></FindComments>
            <ListComments></ListComments>
          </Route>
          <Route path="/findusers">
            <FindUsers></FindUsers>
            <ListUsers></ListUsers>
          </Route>
          <Route path="/nuevolink">
            <NewPost></NewPost>
          </Route>
          <Route path="/mislinks">
            <UserPosts></UserPosts>
          </Route>
          <Route path="/masvotados">
            <MasVotados></MasVotados>
          </Route>
          <Route path="/miscomentarios">
            <MasComentados></MasComentados>
            <UserComments></UserComments>
          </Route>
          <Route path="/editpassword">
            <EditPassword></EditPassword>
          </Route>
          <Route path="/edituser">
            <EditUserProfile></EditUserProfile>
          </Route>
          <Route path="/user/:id">
            <UserDetails></UserDetails>
          </Route>
          <Route path="/comment/:id">
            <CommentDetails></CommentDetails>
          </Route>
          <Route path="/editlink">
            <EditLink></EditLink>
          </Route>
          <Route path="/link/:id">
            <LinkDetails></LinkDetails>
            <DeleteLink></DeleteLink>
          </Route>
          <Route path="/usersarea">
            <UserInfo></UserInfo>
          </Route>
          <Route path="/loggeduser">
            <PrivateHome></PrivateHome>
          </Route>
          <Route path="/register">
            <SignUpApi></SignUpApi>
            <SignUpForm></SignUpForm>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
        </Switch>
        <Footer></Footer>
      </AuthProvider>
    </Router>
  );
}

export default App;
