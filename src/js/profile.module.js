(function() {

  angular.module("profile", ["ngRoute", "ngAnimate"])
    .config(profileConfig);

  profileConfig.$inject = ["$routeProvider", "$locationProvider"];

  function profileConfig($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "resume.template.html",
        controller: "ResumeCtrl",
        controllerAs: "resumectrl",
        bindToController: true
      })
      .otherwise({
        redirectTo: "/"
      })
    ;
    $locationProvider.html5Mode(true);
  }

}());
