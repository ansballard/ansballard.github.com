import page from "page";

import { index, projects, notFound } from "./views";

page.base("/#");
page("/", index);
page("/projects", projects);
page("*", notFound);
page();
