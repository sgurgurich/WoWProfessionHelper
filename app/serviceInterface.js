function getGreeting(){



  $.get('http://localhost:8080/greeting').
  then(function(response){
      //set greeting = response.data;
          console.log(response);
    });



};


function getWowToken(){
  $.get('http://localhost:8080/wowtoken').
  then(function(response){
      //set greeting = response.data;
          console.log(response);
    });

};
