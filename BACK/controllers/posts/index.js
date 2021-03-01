const listPosts = require("./listPosts");
const getPost = require("./getPost");
const newPost = require("./newPost");
const editPost = require("./editPost");
const deletePost = require("./deletePost");
const newComment = require("./newComment");
const editComment = require("./editComment");
const deleteComment = require("./deleteComment");
const lovePost = require("./lovePost");
const listUserPosts = require("./listUserPosts");

module.exports = {
  listPosts,
  getPost,
  newPost,
  editPost,
  deletePost,
  newComment,
  editComment,
  deleteComment,
  lovePost,
  listUserPosts,
};
