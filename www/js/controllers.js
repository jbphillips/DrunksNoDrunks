angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

      function calc() {
        var bill = Number(document.getElementById('bill').value);
        var tip = bill * .15;
        var total_bill = bill + tip;

        document.getElementById("tip").innerHTML= "$"+Number(tip).toFixed(2);
        document.getElementById("total").innerHTML= "$"+Number(total_bill).toFixed(2);
      }

    })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
