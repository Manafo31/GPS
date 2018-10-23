$(document).ready(function () {

  //FullBaseMongoDB();
  chargementLogger();
  connectionApproved==true;
  if (connectionApproved == true) {
    chargementHtml();
  }
});



function affichageMap() {
  $.get('test.html', function (response) {
    $('#main').html(response);
  })
}

function chargementHtml() {
  $.ajax({
    url: "./template/map.html",
    type: 'GET',
    dataType: 'html',
    async: true,
    data: '',
    success: function (result) {
      console.log("chargement map.html dans div main");
      $("#main").html(result);
    },
    error: function (result) {
      console.log("erreur ajax");
      $("#main").html("");

    },
    complete: function (result) {
      console.log('Terminus');
    }
  });
}

function chargementLogger() {
  $.ajax({
    url: "./template/logIn.html",
    type: 'GET',
    dataType: 'html',
    async: true,
    data: '',
    success: function (result) {
      console.log("chargement map.html dans div main");
      $("#main").html(result);
    },
    error: function (result) {
      console.log("erreur ajax");
      $("#main").html("");

    },
    complete: function (result) {
      console.log('Terminus');
    }
  });
}

function FullBaseMongoDB(){
for (var i =0;i<testGpsINSERT.length;i++){
  post=testGpsINSERT[i];
  $.ajax({
    url: "http://nodejs2.afpa-balma.fr/gps/create",
    type: 'POST',
    dataType: 'json',
    async: true,
    data: post,
    success: function (result) {
      console.log("mongodb GPS create ok ! ");
    },
    error: function (result) {
      console.log("erreur ajax");

    },
    complete: function (result) {
    }
  });
}

  
}

