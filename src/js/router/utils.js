"use strict";

const domRoot = document.getElementById("domRoot");

export function loadView(url, cb) {
  domRoot.className = domRoot.className
    .split(" ")
    .filter(c => c !== "removing" && c !== "adding")
    .concat("removing")
    .join(" ")
    .trim()
  ;
  console.log(domRoot.className);
  setTimeout(() => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function() {
      domRoot.innerHTML = this.responseText;
      cb && cb();
    });
    xhr.open("GET", url);
    xhr.send();
    domRoot.className = domRoot.className
      .split(" ")
      .filter(c => c !== "removing" && c !== "adding")
      .concat("adding")
      .join(" ")
      .trim()
    ;
    console.log(domRoot.className);
  }, 300);
}

export function insertListAfter(el, content) {
  const new_node = document.createElement("ul");
  new_node.innerHTML = content;
  el.parentNode.insertBefore(new_node, el.nextSibling);
}
