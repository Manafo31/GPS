$(document).ready(function () {

    var connectionID = {
        id: String,
        password: String
    }
    $("#AppConnection").click(function () {
        console.log("coucou ecoute boutton ");
        connectionID.id = $("#pseudo").val();
        connectionID.password = $("#pass").val();
        console.log(connectionID);
        if (connectionID.password == "pass" && connectionID.id == "id") {
            result = true
        } else(result = false);
        reponseMysql(result);
        //connectionAppBdd(connectionID);


    })


})

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

function reponseMysql(result) {
    if (result == true) {
        console.log("connection autorisée");
        connectionApproved = true;
        chargementHtml();

    } else {
        console.log("connection non autorisée");
        connectionApproved = false;

    }
    // resultat de requete php de max sur bdd
}