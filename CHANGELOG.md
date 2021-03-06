# Changelog

### 0.16.0 (7/24/2016)

**Features Implemented**

- change home page content
- move tags above older posts
- remove footer

**Bugs Fixed**

- semver in changelog

### 0.15.0 (7/24/2016)

**Features Implemented**

- filter by tags
- list tags on postlist page
- inline images in posts

**Bugs Fixed**

- none

### 0.14.0 (5/26/2016)

**Features Implemented**

- build-posts is now in the cli
- moved index.html to src
- silent http-server

**Bugs Fixed**

- incorrect sw url
- commas on postlist page

### 0.13.0 (5/22/2016)

**Features Implemented**

- Better timing for route changes
- renamed built service worker files

**Bugs Fixed**

- none

### 0.12.1 (5/2/2016)

**Features Implemented**

- none

**Bugs Fixed**

- Serviceworkers scripts now works
- Had to add rollup json for service workers

### 0.12.0 (5/1/2016)

**Features Implemented**

- Moved to a single build script
  - uses libs for each file type/action

**Bugs Fixed**

- Removed some unused dev packages

### 0.11.0 (3/16/2016)

**Features Implemented**

- Added a `new-post` script that uses prompts
- Added styling to package.json that should actually stick
- New post

**Bugs Fixed**

- Removed some unused dev packages

### 0.10.0 (3/15/2016)

**Features Implemented**

- Added a `new-post` script that uses prompts
- Added styling to package.json that should actually stick

**Bugs Fixed**

- Removed some unused dev packages

### 0.9.0 (3/11/2016)

**Features Implemented**

- Added tags, ignored by the build script and added to the post data
- Switched to rollup for `deploy:js`, went from 15kb to 10kb, holy shit

**Bugs Fixed**

- none

### 0.8.0 (3/9/2016)

**Features Implemented**

- Added rollupify, trimmed 1kb off `bundle.js` for free

**Bugs Fixed**

- none

### 0.7.0 (3/9/2016)

**Features Implemented**

- Switched from angular to `page.js` for routing and rendering
- Fade in and out on page change

**Bugs Fixed**

- Added specific selector ignores so filesize is ~17% and still working
- Added versioning back to the script and css references on build

### 0.6.0 (3/9/2016)

**Features Implemented**

- Moved all css deployment/postcss/uncss to `scripts/specs.js`
  - Might rename, but it does output specs...
- Social media is now `_target`
- Added syntax highlighting
- Use `http-server` so all dependencies are node

**Bugs Fixed**

- Added specific selector ignores so filesize is ~17% and still working

### 0.5.0 (3/4/2016)

**Features Implemented**

- It's a blog!
- Added posts
- Added a data folder for specs and post mapping
- Added a posts route for listing posts

**Bugs Fixed**

- none

### 0.4.0 (3/2/2016)

**Features Implemented**

- Added `scripts/specs.js` to output CSS Compression specs
- Added spacing to `package.json` for legible scripts (have I already done that?)

**Bugs Fixed**

- none

### 0.0.6 (2/28/2016)

**Features Implemented**

- Moved social wrapper to centered and removed absolute position

**Bugs Fixed**

- none

### 0.3.0 (2/27/2016)

**Features Implemented**

- Flattened the page
- Header is solid blue, links are green, headers are blue
- Footer attribution is changed

**Bugs Fixed**

- none

### 0.2.0 (2/27/2016)

**Features Implemented**

- Added a social media bar in the header
- Removed the contact section

**Bugs Fixed**

- fixed service worker not pulling in `package.json` via browserify

### 0.1.2 (2/27/2016)

**Features Implemented**

- none

**Bugs Fixed**

- Added activate function to remove old versions

### 0.1.1 (2/27/2016)

**Features Implemented**

- none

**Bugs Fixed**

- Service worker now gets cache version from `package.json`

### 0.1.0 (2/27/2016)

**Features Implemented**

- Added cache busting to the `build.js` script
- Renamed the built css file to `bundle.css` for consistency
- Removed Open Sans since it wasn't caching
- Added `build`, `watch`, and `deploy` scripts using concurrently

**Bugs Fixed**

- none
