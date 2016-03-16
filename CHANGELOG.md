# Changelog

### 0.2.3 (3/15/2016)

**Features Implemented**

- Added a `new-post` script that uses prompts
- Added styling to package.json that should actually stick

**Bugs Fixed**

- Removed some unused dev packages

### 0.2.2 (3/11/2016)

**Features Implemented**

- Added tags, ignored by the build script and added to the post data
- Switched to rollup for `deploy:js`, went from 15kb to 10kb, holy shit

**Bugs Fixed**

- none

### 0.2.1 (3/9/2016)

**Features Implemented**

- Added rollupify, trimmed 1kb off `bundle.js` for free

**Bugs Fixed**

- none

### 0.2.0 (3/9/2016)

**Features Implemented**

- Switched from angular to `page.js` for routing and rendering
- Fade in and out on page change

**Bugs Fixed**

- Added specific selector ignores so filesize is ~17% and still working
- Added versioning back to the script and css references on build

### 0.1.1 (3/9/2016)

**Features Implemented**

- Moved all css deployment/postcss/uncss to `scripts/specs.js`
  - Might rename, but it does output specs...
- Social media is now `_target`
- Added syntax highlighting
- Use `http-server` so all dependencies are node

**Bugs Fixed**

- Added specific selector ignores so filesize is ~17% and still working

### 0.1.0 (3/4/2016)

**Features Implemented**

- It's a blog!
- Added posts
- Added a data folder for specs and post mapping
- Added a posts route for listing posts

**Bugs Fixed**

- none

### 0.0.7 (3/2/2016)

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

### 0.0.5 (2/27/2016)

**Features Implemented**

- Flattened the page
- Header is solid blue, links are green, headers are blue
- Footer attribution is changed

**Bugs Fixed**

- none

### 0.0.4 (2/27/2016)

**Features Implemented**

- Added a social media bar in the header
- Removed the contact section

**Bugs Fixed**

- fixed service worker not pulling in `package.json` via browserify

### 0.0.3 (2/27/2016)

**Features Implemented**

- none

**Bugs Fixed**

- Added activate function to remove old versions

### 0.0.2 (2/27/2016)

**Features Implemented**

- none

**Bugs Fixed**

- Service worker now gets cache version from `package.json`

### 0.0.1 (2/27/2016)

**Features Implemented**

- Added cache busting to the `build.js` script
- Renamed the built css file to `bundle.css` for consistency
- Removed Open Sans since it wasn't caching
- Added `build`, `watch`, and `deploy` scripts using concurrently

**Bugs Fixed**

- none
