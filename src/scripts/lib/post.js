"use strict";

import denodeify from "denodeify";
import { writeFile } from "fs";
import { get as prompt } from "prompt";
import mkdirp from "mkdirp";

const mkdirpAsync = denodeify(mkdirp);
const writeFileAsync = denodeify(writeFile);
const promptAsync = denodeify(prompt);

const d = new Date();
const p = "src/md/posts/"
const today = `${d.getFullYear()}/${("0"+(d.getMonth()+1)).slice(-2)}/${("0"+(d.getDate())).slice(-2)}/`;
let tags = "";

export function post(opts = {}) {
	return promptAsync(["title", "tags"])
	.then(opts => {
		if(!opts.title) {
			console.log("Title (-t) Required");
			process.exit(0);
		}
		if(opts.tags) {
			opts.tags = `---
tags: ${opts.tags}
---

`
		}
		return opts;
	})
	.then(opts => mkdirpAsync(p + today)
		.then(() => opts)
	)
	.then(opts => writeFileAsync(
		`${p}${today}${opts.title.replace(" ", "_")}.md`,
		`${opts.tags}# ${opts.title}\r\n#### Subsection\r\n\r\nLorem ipsum\r\n`,
		"utf8"
	));
}
