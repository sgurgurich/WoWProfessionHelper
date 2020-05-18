
function searchAuctionData(realmName, itemId) {
  // search existing actions and print results to app

  var outputArr = [];

  var region = "us";
  var realm = "bleeding-hollow";
  var locale = "en_US";
  var auctionDataServer = "https://" + region + ".api.blizzard.com/wow/auction/data/";


  if (myAccessToken != "") {
    // AN ACTUAL GET REQUEST
    $.ajax({
      url:  auctionDataServer + realm + "?locale=" + locale + "&access_token=" + myAccessToken,
      type: 'GET',

      dataType: "json",
      success: function(res) {

        var auctionDataUrl = res.files[0].url;
        $.getJSON(auctionDataUrl, function (data){

          for (i=0; i < data.auctions.length; i++){
            if (data.auctions[i].item == itemId){
              let mystr = data.auctions[i].buyout.toString();
              price = mystr.slice(0,-4)/data.auctions[i].quantity;

              console.log("Price per unit: " + price + " g");

              outputArr.push("Seller: " + data.auctions[i].owner + "    Price per Unit: " + price);

            }
          }

        });


      },
      error: function(result) {
        //called when there is an error
        console.log("ERROR: Could not access API");
      }
    });



  }


  console.log(outputArr[5]);
  return outputArr;

}

function getWowTokenPrice(tokenPrice) {

  if (myAccessToken != "") {
    // AN ACTUAL GET REQUEST






  }
}
