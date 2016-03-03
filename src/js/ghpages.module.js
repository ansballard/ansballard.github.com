import "angular";
import "angular-route";

import "./serviceworker";

import appConfig from "./config/appConfig";

import "./routes/post/post.module";

angular.module("ghpages", [
  "ngRoute",

  "ghpages.post"
]).config(appConfig);
