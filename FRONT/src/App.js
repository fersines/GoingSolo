import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./shared/context/authContext";
import PrivateHome from "./pages/PrivateHome";
import Footer from "./components/Footer";
import { Global } from "@emotion/react";
import MasVotados from "./components/MasVotados";
import FindUsers from "./components/FindUsers";
import FindComments from "./components/FindComments";
import FindPosts from "./components/FindPosts";
import UserInfo from "./pages/UserInfo";
import NewPost from "./components/NewPost";
import NewPassword from "./components/NewPassword";
import EditPassword from "./components/EditPassword";
import ResetPassword from "./components/ResetPassword";
import ListUsers from "./components/ListUsers";
import UserPosts from "./components/UserPosts";
import EditUserProfile from "./components/EditUserProfile";
import ListComments from "./components/ListComments";
import UserComments from "./components/UserComments";
import UserDetails from "./components/UserDetails";
import CommentDetails from "./components/CommentDetails";
import EditLink from "./components/EditLink";
import LinkInfo from "./pages/LinkInfo";
import SignUpForm from "./components/SignUpForm";
import Header from "./pages/Header";
import NewComment from "./components/NewComment";
import EditComment from "./components/EditComment";

function App() {
  return (
    <Router>
      <Global />
      <AuthProvider>
        <Header></Header>
        <Switch>
          <Route exact path="/findposts">
            <FindPosts></FindPosts>
          </Route>
          <Route exact path="/findcomments">
            <FindComments></FindComments>
            <ListComments></ListComments>
          </Route>
          <Route exact path="/findusers">
            <FindUsers></FindUsers>
          </Route>
          <Route exact path="/nuevolink">
            <NewPost></NewPost>
          </Route>
          <Route exact path="/mislinks">
            <UserPosts></UserPosts>
          </Route>
          <Route exact path="/masvotados">
            <MasVotados></MasVotados>
          </Route>
          <Route exact path="/miscomentarios">
            <UserComments></UserComments>
          </Route>
          <Route exact path="/editpassword">
            <EditPassword></EditPassword>
          </Route>
          <Route exact path="/edituser">
            <EditUserProfile></EditUserProfile>
          </Route>
          <Route exact path="/user/:id">
            <UserDetails></UserDetails>
          </Route>
          <Route exact path="/comment/:id/edit">
            <EditComment></EditComment>
          </Route>
          <Route exact path="/comment/:id">
            <CommentDetails></CommentDetails>
          </Route>
          <Route exact path="/link/:id/edit">
            <EditLink></EditLink>
          </Route>
          <Route exact path="/link/:id">
            <LinkInfo></LinkInfo>
          </Route>
          <Route exact path="/posts/:id/comments">
            <NewComment></NewComment>
          </Route>
          <Route exact path="/usersarea">
            <UserInfo></UserInfo>
          </Route>
          <Route exact path="/loggeduser">
            <PrivateHome></PrivateHome>
          </Route>
          <Route exact path="/newpassword">
            <NewPassword></NewPassword>
            <ResetPassword></ResetPassword>
          </Route>
          <Route exact path="/register">
            <SignUpForm></SignUpForm>
          </Route>
          <Route exact path="/login">
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
