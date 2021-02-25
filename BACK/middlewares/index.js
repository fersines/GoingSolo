const canEditComment = require("./canEditComment");
const canEditPost = require("./canEditPost");
const commentExists = require("./commentExists");
const isUser = require("./isUser");
const postExists = require("./postExists");
const userExists = require("./userExists");

module.exports = {
  canEditComment,
  canEditPost,
  commentExists,
  isUser,
  postExists,
  userExists,
};
