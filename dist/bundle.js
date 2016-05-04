"use strict";function __commonjs(t,e){return e={exports:{}},t(e,e.exports),e.exports}function loadView(t,e){domRoot.className=domRoot.className.split(" ").filter(function(t){return"removing"!==t&&"adding"!==t}).concat("removing").join(" ").trim(),setTimeout(function(){var n=new XMLHttpRequest;n.addEventListener("load",function(){domRoot.innerHTML=this.responseText,e&&e()}),n.open("GET",t),n.send(),domRoot.className=domRoot.className.split(" ").filter(function(t){return"removing"!==t&&"adding"!==t}).concat("adding").join(" ").trim()},300)}function insertListAfter(t,e){var n=document.createElement("ul");n.innerHTML=e,t.parentNode.insertBefore(n,t.nextSibling)}function index$3(){console.log("index"),loadView("/dist/partials/index.template.html")}function posts(){loadView("/dist/partials/postlist.template.html",function(){insertListAfter(document.getElementById("latest-posts"),postList.slice(0,5).map(function(t){return'<li>\n  <a href="'+t.path+'">\n    '+t.title+" ["+(new Date(t.date).getMonth()+1)+"/"+new Date(t.date).getDate()+"/"+new Date(t.date).getFullYear()+"]\n  </a>\n</li>"})),postList.length>5&&insertListAfter(document.getElementById("older-posts"),postList.slice(5).map(function(t){return'<li>\n  <a href="'+t.path+'">\n    '+t.title+" ["+(new Date(t.date).getMonth()+1)+"/"+new Date(t.date).getDate()+"/"+new Date(t.date).getFullYear()+"]\n  </a>\n</li>"}))})}function notFound(){loadView("/dist/partials/404.template.html")}function post(t){loadView("/dist/partials/posts/"+t.params.year+"/"+t.params.month+"/"+t.params.date+"/"+t.params.title+".template.html")}var index$2=__commonjs(function(t){t.exports=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)}}),require$$0$1=index$2&&"object"==typeof index$2&&"default"in index$2?index$2["default"]:index$2,index$1=__commonjs(function(t){function e(t){for(var e,n=[],i=0,r=0,a="";null!=(e=f.exec(t));){var s=e[0],p=e[1],c=e.index;if(a+=t.slice(r,c),r=c+s.length,p)a+=p[1];else{a&&(n.push(a),a="");var u=e[2],l=e[3],h=e[4],d=e[5],m=e[6],g=e[7],v="+"===m||"*"===m,x="?"===m||"*"===m,w=u||"/",y=h||d||(g?".*":"[^"+w+"]+?");n.push({name:l||i++,prefix:u||"",delimiter:w,optional:x,repeat:v,pattern:o(y)})}}return r<t.length&&(a+=t.substr(r)),a&&n.push(a),n}function n(t){return i(e(t))}function i(t){for(var e=new Array(t.length),n=0;n<t.length;n++)"object"==typeof t[n]&&(e[n]=new RegExp("^"+t[n].pattern+"$"));return function(n){for(var i="",r=n||{},o=0;o<t.length;o++){var a=t[o];if("string"!=typeof a){var s,p=r[a.name];if(null==p){if(a.optional)continue;throw new TypeError('Expected "'+a.name+'" to be defined')}if(d(p)){if(!a.repeat)throw new TypeError('Expected "'+a.name+'" to not repeat, but received "'+p+'"');if(0===p.length){if(a.optional)continue;throw new TypeError('Expected "'+a.name+'" to not be empty')}for(var c=0;c<p.length;c++){if(s=encodeURIComponent(p[c]),!e[o].test(s))throw new TypeError('Expected all "'+a.name+'" to match "'+a.pattern+'", but received "'+s+'"');i+=(0===c?a.prefix:a.delimiter)+s}}else{if(s=encodeURIComponent(p),!e[o].test(s))throw new TypeError('Expected "'+a.name+'" to match "'+a.pattern+'", but received "'+s+'"');i+=a.prefix+s}}else i+=a}return i}}function r(t){return t.replace(/([.+*?=^!:${}()[\]|\/])/g,"\\$1")}function o(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function a(t,e){return t.keys=e,t}function s(t){return t.sensitive?"":"i"}function p(t,e){var n=t.source.match(/\((?!\?)/g);if(n)for(var i=0;i<n.length;i++)e.push({name:i,prefix:null,delimiter:null,optional:!1,repeat:!1,pattern:null});return a(t,e)}function c(t,e,n){for(var i=[],r=0;r<t.length;r++)i.push(h(t[r],e,n).source);var o=new RegExp("(?:"+i.join("|")+")",s(n));return a(o,e)}function u(t,n,i){for(var r=e(t),o=l(r,i),s=0;s<r.length;s++)"string"!=typeof r[s]&&n.push(r[s]);return a(o,n)}function l(t,e){e=e||{};for(var n=e.strict,i=e.end!==!1,o="",a=t[t.length-1],p="string"==typeof a&&/\/$/.test(a),c=0;c<t.length;c++){var u=t[c];if("string"==typeof u)o+=r(u);else{var l=r(u.prefix),h=u.pattern;u.repeat&&(h+="(?:"+l+h+")*"),h=u.optional?l?"(?:"+l+"("+h+"))?":"("+h+")?":l+"("+h+")",o+=h}}return n||(o=(p?o.slice(0,-2):o)+"(?:\\/(?=$))?"),o+=i?"$":n&&p?"":"(?=\\/|$)",new RegExp("^"+o,s(e))}function h(t,e,n){return e=e||[],d(e)?n||(n={}):(n=e,e=[]),t instanceof RegExp?p(t,e,n):d(t)?c(t,e,n):u(t,e,n)}var d=require$$0$1;t.exports=h,t.exports.parse=e,t.exports.compile=n,t.exports.tokensToFunction=i,t.exports.tokensToRegExp=l;var f=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))"].join("|"),"g")}),require$$0=index$1&&"object"==typeof index$1&&"default"in index$1?index$1["default"]:index$1,index=__commonjs(function(t){function e(t,n){if("function"==typeof t)return e("*",t);if("function"==typeof n)for(var i=new o(t),r=1;r<arguments.length;++r)e.callbacks.push(i.middleware(arguments[r]));else"string"==typeof t?e["string"==typeof n?"redirect":"show"](t,n):e.start(t)}function n(t){if(!t.handled){var n;n=v?g+d.hash.replace("#!",""):d.pathname+d.search,n!==t.canonicalPath&&(e.stop(),t.handled=!1,d.href=t.canonicalPath)}}function i(t){return"string"!=typeof t?t:m?decodeURIComponent(t.replace(/\+/g," ")):t}function r(t,e){"/"===t[0]&&0!==t.indexOf(g)&&(t=g+(v?"#!":"")+t);var n=t.indexOf("?");if(this.canonicalPath=t,this.path=t.replace(g,"")||"/",v&&(this.path=this.path.replace("#!","")||"/"),this.title=document.title,this.state=e||{},this.state.path=t,this.querystring=~n?i(t.slice(n+1)):"",this.pathname=i(~n?t.slice(0,n):t),this.params={},this.hash="",!v){if(!~this.path.indexOf("#"))return;var r=this.path.split("#");this.path=r[0],this.hash=i(r[1])||"",this.querystring=this.querystring.split("#")[0]}}function o(t,e){e=e||{},this.path="*"===t?"(.*)":t,this.method="GET",this.regexp=c(this.path,this.keys=[],e)}function a(t){if(1===s(t)&&!(t.metaKey||t.ctrlKey||t.shiftKey||t.defaultPrevented)){for(var n=t.path?t.path[0]:t.target;n&&"A"!==n.nodeName;)n=n.parentNode;if(n&&"A"===n.nodeName&&!n.hasAttribute("download")&&"external"!==n.getAttribute("rel")){var i=n.getAttribute("href");if((v||n.pathname!==d.pathname||!n.hash&&"#"!==i)&&!(i&&i.indexOf("mailto:")>-1)&&!n.target&&p(n.href)){var r=n.pathname+n.search+(n.hash||"");"undefined"!=typeof process&&r.match(/^\/[a-zA-Z]:\//)&&(r=r.replace(/^\/[a-zA-Z]:\//,"/"));var o=r;0===r.indexOf(g)&&(r=r.substr(g.length)),v&&(r=r.replace("#!","")),g&&o===r||(t.preventDefault(),e.show(o))}}}}function s(t){return t=t||window.event,null===t.which?t.button:t.which}function p(t){var e=d.protocol+"//"+d.hostname;return d.port&&(e+=":"+d.port),t&&0===t.indexOf(e)}var c=require$$0;t.exports=e;var u,l,h="undefined"!=typeof document&&document.ontouchstart?"touchstart":"click",d="undefined"!=typeof window&&(window.history.location||window.location),f=!0,m=!0,g="",v=!1;e.callbacks=[],e.exits=[],e.current="",e.len=0,e.base=function(t){return 0===arguments.length?g:void(g=t)},e.start=function(t){if(t=t||{},!u&&(u=!0,!1===t.dispatch&&(f=!1),!1===t.decodeURLComponents&&(m=!1),!1!==t.popstate&&window.addEventListener("popstate",x,!1),!1!==t.click&&document.addEventListener(h,a,!1),!0===t.hashbang&&(v=!0),f)){var n=v&&~d.hash.indexOf("#!")?d.hash.substr(2)+d.search:d.pathname+d.search+d.hash;e.replace(n,null,!0,f)}},e.stop=function(){u&&(e.current="",e.len=0,u=!1,document.removeEventListener(h,a,!1),window.removeEventListener("popstate",x,!1))},e.show=function(t,n,i,o){var a=new r(t,n);return e.current=a.path,!1!==i&&e.dispatch(a),!1!==a.handled&&!1!==o&&a.pushState(),a},e.back=function(t,n){e.len>0?(history.back(),e.len--):t?setTimeout(function(){e.show(t,n)}):setTimeout(function(){e.show(g,n)})},e.redirect=function(t,n){"string"==typeof t&&"string"==typeof n&&e(t,function(t){setTimeout(function(){e.replace(n)},0)}),"string"==typeof t&&"undefined"==typeof n&&setTimeout(function(){e.replace(t)},0)},e.replace=function(t,n,i,o){var a=new r(t,n);return e.current=a.path,a.init=i,a.save(),!1!==o&&e.dispatch(a),a},e.dispatch=function(t){function i(){var t=e.exits[s++];return t?void t(o,i):r()}function r(){var i=e.callbacks[a++];return t.path!==e.current?void(t.handled=!1):i?void i(t,r):n(t)}var o=l,a=0,s=0;l=t,o?i():r()},e.exit=function(t,n){if("function"==typeof t)return e.exit("*",t);for(var i=new o(t),r=1;r<arguments.length;++r)e.exits.push(i.middleware(arguments[r]))},e.Context=r,r.prototype.pushState=function(){e.len++,history.pushState(this.state,this.title,v&&"/"!==this.path?"#!"+this.path:this.canonicalPath)},r.prototype.save=function(){history.replaceState(this.state,this.title,v&&"/"!==this.path?"#!"+this.path:this.canonicalPath)},e.Route=o,o.prototype.middleware=function(t){var e=this;return function(n,i){return e.match(n.path,n.params)?t(n,i):void i()}},o.prototype.match=function(t,e){var n=this.keys,r=t.indexOf("?"),o=~r?t.slice(0,r):t,a=this.regexp.exec(decodeURIComponent(o));if(!a)return!1;for(var s=1,p=a.length;p>s;++s){var c=n[s-1],u=i(a[s]);void 0===u&&hasOwnProperty.call(e,c.name)||(e[c.name]=u)}return!0};var x=function(){var t=!1;if("undefined"!=typeof window)return"complete"===document.readyState?t=!0:window.addEventListener("load",function(){setTimeout(function(){t=!0},0)}),function(n){if(t)if(n.state){var i=n.state.path;e.replace(i,n.state)}else e.show(d.pathname+d.hash,void 0,void 0,!1)}}();e.sameOrigin=p}),page=index&&"object"==typeof index&&"default"in index?index["default"]:index,postList=[{title:"A Break from Modwatch",date:"2016-03-21T05:00:00.000Z",path:"/#/posts/2016/03/21/A_Break_from_Modwatch",tags:["modwatch","skyrim"]},{title:"Blogging With Style",date:"2016-03-04T06:00:00.000Z",path:"/#/posts/2016/03/04/Blogging_With_Style",tags:["build system","fluff","blogging"]}],domRoot=document.getElementById("domRoot");page.base("/#"),page("/",index$3),page("/posts",posts),page("/posts/:year/:month/:date/:title",post),page("*",notFound),page(),"serviceWorker"in navigator&&navigator.serviceWorker.register("/cache.sw.js").then(function(){console.log("Service Worker Registered")},function(){console.log("Service Worker Failed to Register")});
//# sourceMappingURL=bundle.js.map