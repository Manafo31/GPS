$(document).ready(function () {

    var connectionID = {
        id: String,
        password: String
    }


    $("#AppConnection").click(function () {
        // alert("coucou ecoute boutton ");
        connectionID.id = $("#pseudo").val();
        connectionID.password = $("#pass").val();
        //console.log(connectionID);
        initPerso(connectionID);
        /*  if (connectionID.password == "pass" && connectionID.id == "id") {
             result = true;
             initPerso(connectionID);
         } else(result = false); */

        //connectionAppBdd(connectionID);
    })
})

function initPerso(connectionID) {
    $.ajax({
        url: server.gps.pseudo + connectionID.id,
        type: 'GET',
        dataType: 'json',
        async: true,
        success: function (result2) {
            console.log("chargement du profil user");
            userLog.pseudo = result2[0].pseudo;
            userLog.avatar = result2[0].avatar;
            userLog.myIdMysql = result2[0].MysqlId;
            result3 = true;
            console.log("userlog:");
            ajoutBaseMongoDb();
            //console.log(userLog);

        },
        error: function (result2) {
            console.log("erreur ajax");

        },
        complete: function (result2) {}
    });
}

function ajoutBaseMongoDb() {
    $.ajax({
        url: server.gps.urlCreate,
        type: 'POST',
        dataType: 'json',
        async: true,
        data: {
            "MysqlId": userLog.myIdMysql,
            "pseudo": userLog.pseudo,
            "avatar": userLog.avatar,
            "coordinates": {
                "longitude": monJson.coordinates.longitude,
                "latitude": monJson.coordinates.latitude
            }
        },
        success: function (result) {
            console.log("creation position user actuelle");
            reponseMysql();
        },
        error: function (result2) {
            console.log("erreur ajax");

        },
        complete: function (result2) {}
    });
}

/**
 * Fonction de retour autorisation d'acces à la bdd
 * @param {*} connectionID //formulaire de connection ( json)
 */
function connectionAppBdd(connectionID) {
    $.ajax({
        url: server.baseMysql,
        type: 'POST',
        dataType: 'json',
        async: true,
        data: connectionID,
        success: function (result) {
            console.log("demande autorisation");
            reponseMysql(result);
        },
        error: function (result) {
            console.log("erreur ajax");

        },
        complete: function (result) {}
    });
}

function reponseMysql() {
    chargementHtml();

    /*  if (result == true) {
         console.log("connection autorisée");
    //stockage(data)

         connectionApproved = true;
         chargementHtml();

     } else {
         console.log("connection non autorisée");
         connectionApproved = false;

     } */
    // resultat de requete php de max sur bdd
}