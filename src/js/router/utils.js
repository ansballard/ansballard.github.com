"use strict";

const domRoot = document.getElementById("domRoot");

export function loadView(url, cb) {
  let asyncFinished = false;
  let htmlRes;
  domRoot.className = domRoot.className
    .split(" ")
    .filter(c => c !== "removing" && c !== "adding")
    .concat("removing")
    .join(" ")
    .trim()
  ;
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function() {
    if(asyncFinished) {
      domRoot.innerHTML = this.responseText;
      toggleFade();
      cb && cb();
    } else {
      asyncFinished = true;
      htmlRes = this.responseText;
    }
  });
  xhr.open("GET", url);
  xhr.send();

  setTimeout(() => {
    if(asyncFinished) {
      domRoot.innerHTML = htmlRes;
      toggleFade();
      cb && cb();
    } else {
      asyncFinished = true;
    }
  }, 300);
}

function toggleFade() {
  domRoot.className = domRoot.className
    .split(" ")
    .filter(c => c !== "removing" && c !== "adding")
    .concat("adding")
    .join(" ")
    .trim()
  ;
}

export function insertListAfter(el, content) {
  const new_node = document.createElement("ul");
  new_node.innerHTML = content;
  el.parentNode.insertBefore(new_node, el.nextSibling);
}
