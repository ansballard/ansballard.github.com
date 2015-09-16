(function() {

  angular.module("profile.sidebar")
    .controller("SidebarCtrl", SidebarCtrl);

  SidebarCtrl.$inject = ["APIService"];

  function SidebarCtrl(APIService) {
    var vm = this;

    vm.profilePic = "https://avatars.githubusercontent.com/u/3535127?v=3";

    APIService.getProfilePic()
      .then(function(url) {
        if(vm.profilePic !== url.data.avatar_url) {
          vm.profilePic = url.data.avatar_url;
        }
      }, function(err) {
        console.log(err);
      }
    );
  }

}());
