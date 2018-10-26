var alerte = {
    serveur: {
        "message": "Pas de connection au serveur",
        "callback": null,
        "titre": "Il y a un problème :",
        "bouton": "OK"
    },
    gps: {
        "message": "Pas de données GPS ",
        "callback": null,
        "titre": "Il y a un problème :",
        "bouton": "OK"
    },
    reseau: {
        "message": "En attente de réseau",
        "callback": function reload() { document.location.reload(true) },
        "titre": "Il y a un problème :",
        "bouton": ["fermer", "actualiser"]
    }
};

//var ann = document.getElementById("annonce");
//ann.innerHTML = "Attendre quelques secondes avant d'avoir le résultat des boutons";


/*********************DONNEES DATA MOBILES********************************/


document.addEventListener("offline", checkConnection, false);

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'connecté';
    states[Connection.ETHERNET] = 'connecté';
    states[Connection.WIFI] = 'connecté';
    states[Connection.CELL_2G] = 'connecté';
    states[Connection.CELL_3G] = 'connecté';
    states[Connection.CELL_4G] = 'connecté';
    states[Connection.CELL] = 'connecté';
    states[Connection.NONE] = 'Pas de connexion internet';

   // var aff = document.getElementById("affichage");
   // var bouton2 = document.getElementById("data");

   // bouton2.addEventListener("touchend", function () {
        var cible = alerte.reseau;
        navigator.notification.confirm(states[networkState], cible.callback, cible.titre, cible.bouton)
     
  
}


/*********************DONNEES GPS********************************/

document.addEventListener("deviceready", checkGPS, false);

function checkGPS() {
   // var bouton1 = document.getElementById("gps");
  //  var aff = document.getElementById("affichage");
  //  bouton1.addEventListener("touchend", function () {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError, { timeout: 3000 });
   // })

    function geoError(error) {
        var target = alerte.gps;
        switch (error.code) {
            case error.PERMISSION_DENIED: navigator.notification.alert(target.message, target.callback, target.titre, target.bouton);
                break;
            case error.POSITION_UNAVAILABLE: navigator.notification.alert(target.message, target.callback, target.titre, target.bouton);
                break;
            case error.TIMEOUT: navigator.notification.alert(target.message, target.callback, target.titre, target.bouton);
                break;
            default:
                break;
        }
    }

    function geoSuccess() {

      //  var aff = document.getElementById("affichage");
       // aff.innerHTML = "données gps OK";
    }

}

/***************************DONNEES SERVEUR********************************/


//var bouton3 = document.getElementById("serveur");
//bouton3.addEventListener("touchend", function () {

    $.ajax({
        url: "http://nodejs2.afpa-balma.fr/rdv/select/all",
        type: "GET",
        dataType: 'json',
        async: true,
        success: function (data) {
            //var aff = document.getElementById("affichage");
            //aff.innerHTML = data;
            console.log("test connection serveur OK");
        },
        error: function () {
            var target = alerte.serveur;
            navigator.notification.alert(target.message, target.callback, target.titre, target.bouton);

        }

    });
//});