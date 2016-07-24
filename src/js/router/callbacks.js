"use strict";

import postList from "../../../data/posts";
import { loadView, insertListAfter, insertTagsAfter, prettyDate, uniq } from "./utils";

export function index() {
  loadView("/dist/partials/index.template.html");
}

export function posts(ctx) {
  loadView("/dist/partials/postlist.template.html", () => {
    insertListAfter(document.getElementById("latest-posts"), postList
    .slice(0, 5)
    .filter(item => typeof ctx.params.tag === "undefined" ? true : item.tags.includes(ctx.params.tag))
    .map(item =>
`<li>
  <a href="${item.path}" class="postlist-post-link">
    ${item.title} <span class="post-date">${prettyDate(new Date(item.date))}</span>
  </a>
</li>`)
    .join(""));
    if(postList.length > 5) {
      insertListAfter(document.getElementById("older-posts"), postList
      .slice(5)
      .map(item =>
`<li>
  <a href="${item.path}">
    ${item.title} <span class="post-date">${prettyDate(new Date(item.date))}</span>
  </a>
</li>`)
      .join(""));
    } else {
      document.getElementById("older-posts").style.display = "none";
    }
    insertTagsAfter(document.getElementById("tags"), [].concat(...postList.map(post => post.tags))
      .filter(uniq)
    )
  });
}

export function notFound() {
  loadView("/dist/partials/404.template.html");
}

export function post(ctx) {
  loadView(`/dist/partials/posts/${ctx.params.year}/${ctx.params.month}/${ctx.params.date}/${ctx.params.title}.template.html`);
}
