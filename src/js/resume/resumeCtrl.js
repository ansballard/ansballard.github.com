(function() {

  angular.module("profile.resume")
    .controller("ResumeCtrl", ResumeCtrl);

  ResumeCtrl.$inject = [];

  function ResumeCtrl() {
    var vm = this;

    vm.test = "this is a test";
  }

}());
