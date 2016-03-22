---
tags: build system,fluff,blogging
---

# Blogging With Style
### Offline, Single Page, Minified Goodness

I've created a lot of strange things since I've gotten into web development. Usually it starts with an unachievable goal, and ends with a nonsensical git repo full of dirty code and remorse. That's not what I want to write about today though. Today I want to talk about a site that started as the smallest possible project I could think of. And if you're reading this, you're already using it.

I've gone through several phases where I felt the violent urge to make a big fancy github profile page, complete with nausea-inducing animations and janky layouts. This usually ends with me rediscovering the fact that I should never design anything, and I should probably quit my job and live in the woods. So the most recent time I got the ghpages bug, I limited myself. _Stick to a template_, I said. _Only add text_, I said. _Then you're done_. Obviously, I have zero self control.

It started off small: I didn't like that my site was being built from a minified JSON file that GitHub spit out at me. So I put a markdown file with my content in a directory and wrote an npm script to transpile to `index.html`. Then I saw that there was more than one CSS file being loaded. Being an obnoxious concatenation hipster, I added `postcss` and friends to compile them into one file. But it was still 17kb! Absurd! So I added `uncss` to strip out any unused css, then minified it with `cssnano`. 2kb seemed reasonable enough, so I moved on.

I was running low on ideas for things to add to my page, so I looked at a few other web developer sites. Most of them had links to their various social media pages, so that seemed like a good next step. I threw some links below the header. Which would have been perfectly fine by itself, without anything extra. But at this point I'd decided my site _needed_ animations. Because obviously I have memory problems. So I added a _tasteful_ little dropdown for each to show respective usernames. I'm hoping since they're so easy to see they will stop me from adding anything else. Doubtful.

After my totally _subtle_ animations were done, I wasn't really sure what to do next. All the other developer sites were full blown blogs, with titles and dates and formatting. Scary stuff. I've tried to start blogging a few times, all with varying degrees of failure. But one thing I hadn't tried yet was to build a blog from scratch. No Wordpress, no Medium, no Jekyll. Basically none of those pesky things people have already built for this **exact** purpose. What's more fun that building something from scratch that already exists? I'll tell you: building it with Angular.

What's the point of a website if you have to load any single piece of it more than once? It's barbaric! So instead of doing that, let's load up a few hundred kilobytes of javascript and do all that fun routing and data binding on the client! And while we're at it, let's cache every request with a **Service Worker** (cue angels singing), in case you get a kick out of turning off your wifi from time to time. And that's when my little template site got real.

The angular portion is actually fairly small, so let's go over the build system. There are several pieces, from building js to css to html partials to mapping out posts. The javascript is built via `browserify`, `babelify`, and `uglifyjs`, fairly straightforward. There are two scripts though, one for the angular and one for the serviceworker, which needs to be written to the root of the site. It also pulls in the version in `package.json` to keep track of cache versions, but most of that file is from [CSS Tricks](https://css-tricks.com/serviceworker-for-offline/).

The CSS is probably the most involved. I added an `entry.css` file to import each other css file, then ran that through `postcss`, which writes to a temp file. After that, I run `uncss` on the temp file, pipe the output to `cssnano`, and build `bundle.css`, which is linked from `index.html`. I tried to take out the temp file and just overwrite the file, but uncss did **not** like that, so I gave up. The markdown piece is fairly simple: read every `.md` file in the `src/` directory, and transpile them with `marked` to the `dist` directory. And that's where angular looks for it's templates. Easy Peazy.

So there you have it! A blog, running on Github Pages, cached the first time you hit it, and running on one page. I think I like it. I hope you like it. If not, send me a passive-aggressive tweet, I'll be sure to do better next time.

Thanks for reading!
