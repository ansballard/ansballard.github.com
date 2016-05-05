---
tags: npm,automation,node,workflow
---

# Growing Out of NPM Scripts
#### The Great Wall of Scripts

Several months ago I started moving a few of my old projects from Gulp to a set of "standard" `npm run` scripts. Where once I had multiple verbose files for building my javascript and css, was a list of `build`, `watch`, and `deploy` lines for each file format. It seemed so much simpler. Not to mention the portability for new projects. So I ran with it, converting everything I touched to a single list of commands.

```javascript
"scripts": {
  "build:js": "browserify src/entry.js -t partialify -t babelify -o dist/bundle.js",
  "watch:js": "watchify src/entry.js -t partialify -t babelify -o dist/bundle.js",
  "deploy:js": "browserify src/entry.js -t partialify -t babelify | uglifyjs > dist/bundle.js",
  /* CSS, backend, etc */
}
```

This went well for a while. Concatenating and minifying frontend assets was as simple as copying the same list of scripts and following a standard directory structure. No config, no extra files, just some extra lines in `package.json`. But that leaves out things like cache busting, uncss, and generally things that don't work strictly through a cli.

So I added a scripts folder, then a script to run uncss. But suddenly my clean single file solution was gone. So I could either skip uncss, and transfer twice as much CSS as necessary. Or I could ditch the single file idea and try something new. It's safe to say I chose option two.

### The Fun Begins

Obviously one option would be to use something like webpack. A simple command, mostly plug and play with a little configuration. But webpack never made much sense to me, and you can't go wrong with getting some practice writing Node scripts. So I made a separate lib files for each file format, and a central file to call them.

```javascript
export function javascript(opts = {}) {
  return rollup.rollup({
    entry: opts.entry, // path to entry file
    plugins: [
      nodeResolve(), // allows npm packages
      commonjs(), // allows commonjs packages
      babel({ // transpiles es2015
        exclude: "node_modules/**",
        babelrc: false,
        presets: ["es2015-rollup"]
      })
    ]
  })
  .then(bundle => bundle.generate({
    format: "cjs",
    sourceMap: true
  }))
  /* optionally minifies output */
  .then(obj => opts.minify ? uglifyjs.minify(obj.code, {
    inSourceMap: JSON.parse(obj.map),
    outSourceMap: "bundle.js.map",
    fromString: true,
    mangle: true
  }) : obj);
  /* Returns { code, map } */
}
```

So the above file takes an entry file, and returns transpiled javascript and a sourcemap. Nice and functional. For now the options are determined via command line arguments, but one of the beauties of this modularity means a GUI or even a server could call this function. So if ever I needed to make my build system accessible to users not familiar with a cli, it would take minimal effort to switch.

```javascript
program // use commander to get cli args
.option("-m, --minify", "Minify")
.option("-j, --javascript", "Build Javascript")
.option("-w, --watch", "Watch for Changes")
.parse(process.argv);

if(program.javascript) { // so file formats can be specified
  buildJavascript({
    entry: "src/js/entry.js",
    minify: program.minify
  });
  if(program.watch) {
    watchFileType({ // watching for changes, shown later
      ext: "js"
    });
  }
}

function buildJavascript(opts = {}) {
  return javascript({
    entry: opts.entry,
    minify: opts.minify
  })
  .then(obj => Promise.all([ // writes the transpiled code and sourcemaps
    writeFileAsync("dist/bundle.js", obj.code),
    writeFileAsync("dist/bundle.js.map", obj.map)
  ]));
}
```

So this allows for running your build scripts whenever you want with a single script. Except you'll usually be rebuilding your files as your go. This is where watch comes in, so you don't have to keep rerunning as you make changes. And since the build scripts are separate, it's just a matter of wrapping that call.

```javascript
function watchFileType(opts = {}) {
  watch.watchTree(`src/${opts.dirName || opts.srcExt || opts.ext}`, { // watch the source files for the given file format
    ignoreDotFiles: true,
    ignoreUnreadableDir: true
  }, (f, curr, prev) => {
    if (typeof f !== "object" || prev !== null || curr !== null) { // an if case for when a file is changed, added, or deleted
      spinner.color = "yellow";
      spinner.text = `Building ${(opts.srcExt || opts.ext).toUpperCase()}`; // show when changes happen
      builds[opts.ext]({ // map build scripts to file extension
        entry: `src/${opts.dirName || opts.ext}/entry.${opts.ext}`,
        minify: program.minify
      })
      .then(() => {
        spinner.color = "white";
        spinner.text = restingSpinnerMessage; // changes are finished
      })
      .catch(e => {
        console.log(e);
        spinner.color = "red";
        spinner.text = `Error Building ${(opts.srcExt || opts.ext).toUpperCase()}`; // notify the users of errors, but don't exit
      });
    }
  });
}
```

### Getting Fancy

And there's what wraps the build scripts, which means all you have to do is specify file types to build, and whether they should be rebuilt on changes. So what's left? What is the least user friendly part of running continuous scripts in Node? At least for me, it's never knowing how many times you have to smash `Ctrl+C` before the script really stops, or your terminal crashes. But what can we do about that?

```javascript


const restingSpinnerMessage = "Watching: `Q` to quit";
const spinner = ora(restingSpinnerMessage);

if(program.watch) {
  spinner.start();
  keypress(process.stdin);

  process.stdin.on("keypress", (ch, key) => {
    if (key && key.name === "q") {
      spinner.stop();
      process.exit(0);
    }
  });
}

/* ... */

if(program.watch) {
  process.stdin.setRawMode(true);
  process.stdin.resume();
}
```

Well that's a nice little code snippet, but what's it for? Well, as long as you specify `--watch`, it will intercept stdin, read the character codes, and cleanly stop the script if the key pressed is `Q`. It will also start up `ora`, which means no long lists of console logs, just a single line in the terminal that can be updated. And that's a general overview of the build system this site uses. So if you want to see the rest of the build scripts, or if any of the snippets don't make sense out of context, just check the `src/scripts` folder at [the site's repo](https://github.com/ansballard/ansballard.github.com).

Thanks for reading!
