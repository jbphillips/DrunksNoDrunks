angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {

     $scope.calc = function() {
         var foodTotal = Number(document.getElementById('foodTotal').value);
         var tip = foodTotal * (Number(document.getElementById('tip').value) / 100);
         var total_food_bill = foodTotal + tip;

         var drinkTotal = Number(document.getElementById('drinkTotal').value);

         var total_bill = foodTotal + drinkTotal + tip;

         var drunks = Number(document.getElementById('drunks').value);
         var nondrunks = Number(document.getElementById('nondrunks').value);

         var drunksTotal = (drinkTotal / drunks) + (total_food_bill / (drunks + nondrunks));
         var nonDrunksTotal = total_food_bill / (drunks + nondrunks);

         document.getElementById("total_food_bill").innerHTML= "$"+Number(total_food_bill).toFixed(2);
         document.getElementById("total_bill").innerHTML= "$"+Number(total_bill).toFixed(2);

         document.getElementById("drunksTotal").innerHTML= "$"+Number(drunksTotal).toFixed(2);
         document.getElementById("nonDrunksTotal").innerHTML= "$"+Number(nonDrunksTotal).toFixed(2);
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
