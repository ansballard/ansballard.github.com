import "angular";
import "angular-route";

import posts from "../../data/posts";

import "./serviceworker";

import appConfig from "./config/appConfig";

import "./routes/post/post.module";
import "./routes/postlist/postlist.module";

angular.module("ghpages", [
  "ngRoute",

  "ghpages.post",
  "ghpages.postlist"
])
.constant("posts", posts)
.config(appConfig);
