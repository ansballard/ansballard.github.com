(function() {
  "use strict";

  angular.module("profile.sidebar")
    .directive("sidebarDirective", SidebarDirective);

  function SidebarDirective() {
    return {
      restrict: "EA",
      templateUrl: "sidebar.template.html",
      scope: {},
      controller: "SidebarCtrl",
      controllerAs: "vm",
      bindToController: true
    };
  }
}());
