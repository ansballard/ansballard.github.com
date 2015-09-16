(function() {

  angular.module("profile.api")
    .factory("APIService", APIService);

  APIService.$inject = ["$http"];

  function APIService($http) {
    return {
      getProfilePic: function() {
        return $http.get("//api.github.com/users/ansballard");
      }
    };
  }

}());
