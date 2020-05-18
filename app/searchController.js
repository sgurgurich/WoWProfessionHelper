myApp.controller('SearchController', ['$scope', function($scope) {

  $scope.numOfResults = "all";

  $scope.showResults = false;
  $scope.showNoResults = false;
  $scope.showLoadingSpinner = false;

  $scope.enterSearchParams = function() {

    $scope.searchResults = [];
    $scope.showResults = false;
    $scope.showNoResults = false;
    $scope.showLoadingSpinner = false;

    var outputArr = [];

    var region = "us";
    var realm = "bleeding-hollow";
    var locale = "en_US";
    var auctionDataServer = "https://" + region + ".api.blizzard.com/wow/auction/data/";
    var itemDataServer = "https://" + region + ".api.blizzard.com/wow/item/";

    if (myAccessToken != "") {
      // AN ACTUAL GET REQUEST
      $scope.showLoadingSpinner = true;
      $.ajax({
        url: auctionDataServer + realm + "?locale=" + locale + "&access_token=" + myAccessToken,
        type: 'GET',

        dataType: "json",
        success: function(res) {

          var auctionDataUrl = res.files[0].url;
          $.getJSON(auctionDataUrl, function(data) {

            var count = 0;

            for (i = 0; i < data.auctions.length; i++) {
              if (data.auctions[i].item == itemList[$scope.itemName]) {
                let mystr = data.auctions[i].buyout.toString();
                var price = mystr.slice(0, -4);
                var quant = data.auctions[i].quantity;
                var pricePer = price / quant;
                //var outStr = "Seller: " + data.auctions[i].owner + " - Stack Size: " + quant + " - Stack Price: " +  price + " - Price per Unit: " + pricePer;
                var outObj = {
                    seller: data.auctions[i].owner,
                    stackSize: quant,
                    stackPrice: price,
                    ppu: pricePer
                };
                count++;
                outputArr.push(outObj);
              }
            }

            $scope.$apply(function() {
              if (outputArr.length > 0){
                $scope.searchResults = outputArr;
                $scope.showLoadingSpinner = false;
                $scope.showResults = true;
              }else{
                $scope.showNoResults = true;
                $scope.showLoadingSpinner = false;
              }

            });

          });

        },
        error: function(result) {
          //called when there is an error
          console.log("ERROR: Could not access API");
        }
      });





    }

  }

}]);
