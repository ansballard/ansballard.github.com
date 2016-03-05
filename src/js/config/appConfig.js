export default appConfig;

appConfig.$inject = ["$routeProvider"];

function appConfig($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "/dist/partials/index.template.html"
    })
    .when("/posts", {
      templateUrl: "/dist/partials/postlist.template.html",
      controller: "PostListController",
      controllerAs: "vm",
      bindToController: true
    })
    .when("/posts/:year/:month/:date/:title", {
      templateUrl: (params) => `/dist/partials/posts/${params.year}/${params.month}/${params.date}/${params.title}.template.html`,
      controller: "PostController",
      controllerAs: "vm",
      bindToController: true
    })
    .otherwise({
      templateUrl: "/dist/partials/404.template.html"
    })
}
