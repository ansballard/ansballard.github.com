"use strict";

import postList from "../../../data/posts";

import { loadView, insertListAfter } from "./utils";

export function index() {
  loadView("/dist/partials/index.template.html");
}

export function posts() {
  loadView("/dist/partials/postlist.template.html", () => {
    insertListAfter(document.getElementById("latest-posts"), postList
    .slice(0, 5)
    .map(item =>
`<li>
  <a href="${item.path}">
    ${item.title} [${new Date(item.date).getMonth()+1}/${new Date(item.date).getDate()}/${new Date(item.date).getFullYear()}]
  </a>
</li>`)
    .join(""));
    if(postList.length > 5) {
      insertListAfter(document.getElementById("older-posts"), postList
      .slice(5)
      .map(item =>
`<li>
  <a href="${item.path}">
    ${item.title} [${new Date(item.date).getMonth()+1}/${new Date(item.date).getDate()}/${new Date(item.date).getFullYear()}]
  </a>
</li>`)
      .join(""));
    }
  });
}

export function notFound() {
  loadView("/dist/partials/404.template.html");
}

export function post(ctx) {
  loadView(`/dist/partials/posts/${ctx.params.year}/${ctx.params.month}/${ctx.params.date}/${ctx.params.title}.template.html`);
}
