// creates the app module
// the params are (name, dependencies)
var myApp = angular.module('wowProfessionHelper', ['ngRoute']);

// function called during program load
myApp.config(['$routeProvider', function($routeProvider) {
   $routeProvider.

   when('/home', {
      templateUrl: 'home.htm', controller: 'HomeController'
   }).

   when('/search', {
      templateUrl: 'search.htm', controller: 'SearchController'
   }).

   when('/professions', {
      templateUrl: 'professions.htm', controller: 'ProfessionsController'
   }).

   when('/about', {
      templateUrl: 'about.htm', controller: 'AboutController'
   }).

   otherwise({
      redirectTo: '/home'
   });

}]);

// function called during main execution
myApp.run(function($rootScope){
  getGreeting();
  $.get('http://localhost:8080/wowtoken').
  then(function(response){
    $rootScope.$apply(function(){
      let mystr = response.price.toString();
      $rootScope.wowTokenPrice = mystr.slice(0,-4) + " g";
    });
    console.log(response);
    });





/*
  $.ajax("https://us.battle.net/oauth/token", {
      type: "POST",
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: myTokenReqObj,
      complete: function(result) {
          //called when complete
          //alert(result);
      },

      success: function(result) {
          //called when successful
          // save our access token
          myAccessToken = result.access_token;
          console.log(myAccessToken);

          $.ajax({
            url: "https://us.api.blizzard.com/data/wow/token/?namespace=dynamic-us&access_token=" + myAccessToken,
            type: 'GET',
            dataType: 'jsonp', // added data type
            success: function(res) {
              $rootScope.$apply(function(){
                let mystr = res.price.toString();
                $rootScope.wowTokenPrice = mystr.slice(0,-4) + " g";
              });
            },
            error: function(result) {
              //called when there is an error
              console.log("ERROR: Could not access API");
            }
          });

      },

      error: function(result) {
          //called when there is an error
        //  alert(result);

      },
  });


*/
});


angular.module('directive.loading', [])

    .directive('loading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.show();
                    }else{
                        elm.hide();
                    }
                });
            }
        };

    }]);
