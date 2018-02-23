const domRoot = document.getElementById("domRoot");

export function loadView(view) {
  let asyncFinished = false;
  let htmlRes;

  domRoot.className = domRoot.className
    .split(" ")
    .filter(c => c !== "removing" && c !== "adding")
    .concat("removing")
    .join(" ")
    .trim()
  ;

  setTimeout(() => {
    if(asyncFinished) {
      domRoot.innerHTML = htmlRes;
      toggleFade();
    } else {
      asyncFinished = true;
    }
  }, 300);

  return view.then(content => {
    console.log(content);
    if(asyncFinished) {
      domRoot.innerHTML = content;
      toggleFade();
    } else {
      asyncFinished = true;
      htmlRes = content;
    }
    return content;
  });
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

export function prettyDate(date) {
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function uniq(value, index, self) {
    return self.indexOf(value) === index;
}
