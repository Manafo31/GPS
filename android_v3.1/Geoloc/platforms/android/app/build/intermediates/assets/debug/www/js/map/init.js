$(document).ready(function () {

  $("#main").load("./template/map.html");
  chargementHtml();
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