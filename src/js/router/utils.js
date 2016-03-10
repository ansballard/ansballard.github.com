"use strict";

const domRoot = document.getElementById("domRoot");

export function loadView(url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function() {
    domRoot.innerHTML = this.responseText;
    cb && cb();
  });
  xhr.open("GET", url);
  xhr.send();
}

export function insertListAfter(el, content) {
  const new_node = document.createElement("ul");
  new_node.innerHTML = content;
  el.parentNode.insertBefore(new_node, el.nextSibling);
}
