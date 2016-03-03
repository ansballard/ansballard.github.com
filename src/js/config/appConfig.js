export default appConfig;

appConfig.$inject = ["$routeProvider"];

function appConfig($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "/dist/partials/index.template.html"
    })
    .when("/post/:year/:month/:date/:title", {
      templateUrl: (params) => `/dist/partials/${params.year}/${params.month}/${params.date}/${params.title}.template.html`,
      controller: "PostController",
      controllerAs: "vm",
      bindToController: true
    })
    .otherwise({
      templateUrl: "/dist/partials/404.template.html"
    })
}
