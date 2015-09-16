(function() {

  angular.module("profile", [
    "ngRoute", "ngAnimate",

    "profile.api",
    "profile.resume",
    "profile.sidebar"
  ])
    .config(profileConfig);

  profileConfig.$inject = ["$routeProvider", "$locationProvider"];

  function profileConfig($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "resume.template.html",
        controller: "ResumeCtrl",
        controllerAs: "vm",
        bindToController: true
      })
      .otherwise({
        redirectTo: "/"
      })
    ;
    $locationProvider.html5Mode(true);
  }

}());
