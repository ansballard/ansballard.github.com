"use strict";

import page from "page";

import {index, post, posts, notFound} from "./callbacks";

page.base("/#");
page("/", index);
page("/posts", posts);
page("/posts/:year/:month/:date/:title", post);
page("*", notFound);
page();
