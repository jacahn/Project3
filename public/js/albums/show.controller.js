"use strict";

(function(){

  angular
  .module("albums")
  .controller("AlbumShowController", [
    "$stateParams",
    "$firebaseObject",
    AlbumShowControllerFunction
  ]);

  function AlbumShowControllerFunction($stateParams, $firebaseObject){
    var vm = this;
    var ref = firebase.database().ref().child("albums/" + $stateParams.id);

    var syncObject = $firebaseObject(ref);
    syncObject.$loaded().then(function(album){
      vm.album = album
    });

    vm.create = function(){
      debugger
      vm.album.photos.push(vm.newPhoto)
      vm.album.$save().then(function(){
        vm.newPhoto = {};
      });
    }

    vm.update = function(){
      vm.album.$save()
    }
    vm.delete = function($index){
      vm.album.photos.splice($index, 1)
      vm.album.$save()
    }
  }


}());
