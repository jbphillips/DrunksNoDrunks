angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $ionicPopover) {

        var template = '<ion-popover-view><ion-header-bar> <h1 class="title">Default Title</h1> </ion-header-bar> <ion-content> Uh-oh! Its dead Jim! </ion-content></ion-popover-view>';

        $scope.popover = $ionicPopover.fromTemplate(template, {
            scope: $scope
        });

    $scope.calcTipForm = function($event) {
        $scope.popover.show($event);
    };

        $ionicPopover.fromTemplateUrl('calcTip-popover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });

        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function() {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function() {
            // Execute action
        });

     $scope.calc = function() {

         validate();

         var foodTotal = Number(document.getElementById('foodTotal').value);
         var tip = foodTotal * (Number(document.getElementById('tip').value) / 100);
         var tax = Number(document.getElementById('taxTotal').value);
         var total_food_bill = foodTotal + tip;

         var drinkTotal = Number(document.getElementById('drinkTotal').value);

         var total_bill = foodTotal + drinkTotal + tip + tax;

         var drunks = Number(document.getElementById('drunks').value);
         var nondrunks = Number(document.getElementById('nondrunks').value);

         var drunksTotal = 0;
         var nonDrunksTotal = 0;

         if(drunks > 0)
            drunksTotal = (drinkTotal / drunks) + (total_food_bill / (drunks + nondrunks));

         if(nondrunks > 0) {
             nonDrunksTotal = total_food_bill / (drunks + nondrunks);
         }

         if(drunks < 1 && drinkTotal > 0)
            alert("Can not have a drink total with no drunks dumbass")


         document.getElementById("total_food_bill").innerHTML= "$"+Number(total_food_bill).toFixed(2);
         document.getElementById("total_bill").innerHTML= "$"+Number(total_bill).toFixed(2);

         document.getElementById("drunksTotal").innerHTML= "$"+Number(drunksTotal).toFixed(2);
         document.getElementById("nonDrunksTotal").innerHTML= "$"+Number(nonDrunksTotal).toFixed(2);
      }

        $scope.calcTip = function() {
            var billTotal = Number(document.getElementById('billTotal').value);
            var tip = Number(document.getElementById('tipPercentage').value) / 100;

            var suggestedTip = billTotal * tip;

            document.getElementById("tipAmount").innerHTML= "$"+Number(suggestedTip).toFixed(2);
        }

        function validate() {

            if( isNaN(Number(document.getElementById('foodTotal').value))){
                alert("Food Total is not a number")
            }
            if( isNaN(Number(document.getElementById('tip').value))){
                alert("Tip entry is not a number")
            }
            if( isNaN(Number(document.getElementById('taxTotal').value))){
                alert("Tax Total is not a number")
            }
            if( isNaN(Number(document.getElementById('drinkTotal').value))){
                alert("Drink Total is not a number")
            }
            if( isNaN(Number(document.getElementById('drunks').value))){
                alert("Input for drunks is not a number")
            }
            if( isNaN(Number(document.getElementById('nondrunks').value))){
                alert("Input for Sobers is not a number")
            }
        }
    })

.controller('AccountCtrl', function($scope, $rootScope, $ionicUser, $ionicPush) {
            // Identifies a user with the Ionic User service
            $scope.identifyUser = function() {
                console.log('Ionic User: Identifying with Ionic User service');

                var user = $ionicUser.get();
                if(!user.user_id) {
                    // Set your user_id here, or generate a random one.
                    user.user_id = $ionicUser.generateGUID();
                };

                // Add some metadata to your user object.
                angular.extend(user, {
                    name: 'Juditron',
                    bio: 'I come from planet Ion'
                });

                // Identify your user with the Ionic User Service
                $ionicUser.identify(user).then(function(){
                    $scope.identified = true;
                    alert('Identified user ' + user.name + '\n ID ' + user.user_id);
                });


                // Registers a device for push notifications and stores its token
                $scope.pushRegister = function() {
                    console.log('Ionic Push: Registering user');

                    // Register with the Ionic Push service.  All parameters are optional.
                    $ionicPush.register({
                        canShowAlert: true, //Can pushes show an alert on your screen?
                        canSetBadge: true, //Can pushes update app icon badges?
                        canPlaySound: true, //Can notifications play a sound?
                        canRunActionsOnWake: true, //Can run actions outside the app,
                        onNotification: function(notification) {
                            // Handle new push notifications here
                            // console.log(notification);
                            return true;
                        }
                    });
                };

                // Handles incoming device tokens
                $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
                    alert("Successfully registered token " + data.token);
                    console.log('Ionic Push: Got token ', data.token, data.platform);
                    $scope.token = data.token;
                });
            };

        $scope.sendEmail = function() {
            if(window.plugins && window.plugins.emailComposer) {
                window.plugins.emailComposer.showEmailComposerWithCallback(function (result) {
                        console.log("Response -> " + result);
                    },
                    "Hey?! I want to bug you!", // Subject
                    "",                      // Body
                    ["jamminjimi@gmail.com"],    // To
                    null,                    // CC
                    null,                    // BCC
                    false,                   // isHTML
                    null,                    // Attachments
                    null);                   // Attachment Data
            };
    }
});
