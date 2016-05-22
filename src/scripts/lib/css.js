"use strict";

import "core-js/es6/promise";
import glob from "glob";
import { readFile, writeFile } from "fs";
import postcss from "postcss";
import cssImport from "postcss-import";
import cssnext from "postcss-cssnext";
import uncss from "uncss";
import cssnano from "cssnano";
import denodeify from "denodeify";

const readFileAsync = denodeify(readFile);
const writeFileAsync = denodeify(writeFile);
const globAsync = denodeify(glob);
const uncssAsync = denodeify(uncss);

const uncssIgnores = [/\.main-content\sh\d/, /\.hljs/, /code/, /pre/, /\.lang\-/, /\.adding/, /\.removing/];

export default function css(opts = {}) {
    return readFileAsync(opts.entry, "utf8")
    .then(css =>
        postcss([cssImport, cssnext]).process(css, {
        	from: "./src/css/entry.css",
        	to: "spec.css"
        })
    )
    .then(result => result.css)
    .then(css => globAsync("./dist/partials/**/*.html")
        .then(files => opts.minify ? uncssAsync(["./index.html"].concat(files), {
        	ignore: uncssIgnores,
        	raw: css,
        	ignoreSheets: [/dist\/bundle\.css\?v=\d+\.\d+\.\d+/]
        }) : css)
    )
    .then(css => opts.minify ? cssnano.process(css) : {css: css})
    .then(css => Promise.all([
      writeFileAsync(opts.out, css.css),
      opts.sourcemap ? writeFileAsync(`${opts.out}.map`, css.map) : Promise.resolve()
    ]))
    .then(() => opts)
    .catch(e => {
      console.log(e);
    });
}
