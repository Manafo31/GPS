$(document).ready(function () {

    // variables latitude et longitude initialisées à vide pour le JSON
    var maTimestamp = undefined;
    var latJSON = undefined;
    var longJSON = undefined;

    insertionPosition();

    function insertionPosition() {

        navigator.geolocation.getCurrentPosition(onSuccess, onError, {
            timeout: 5000
        })
    };

    // en cas de succès 
    function onSuccess(position) {
        var maLat = document.getElementById('lat');
        var maLong = document.getElementById('long');
        var maTimes = document.getElementById('times');

        // gestion d'erreur des valeurs de la position
        if (position.coords.latitude != undefined &&
            position.coords.longitude != undefined &&
            position.timestamp != undefined) {

        } else {
            insertionPosition();
        };


        maTimestamp = position.timestamp;
        latJSON = position.coords.latitude;
        longJSON = position.coords.longitude;

        // contrôle des valeurs pour le JSON
        if (longJSON && latJSON != undefined) {
            alert("position aquise ! ");
            json = maPosition(latJSON, longJSON, maTimestamp);
        } else {
            console.log("Les coordonnées GPS n'ont pas été envoyées au JSON");
        };
    };

    // en cas d'erreur
    function onError(error) {
        alert('En recherche de position ...');
            insertionPosition();
    }

    // methode de génération d'un json avec la position
    function maPosition(latData, longData, timestampData) {


        // mon objet json 
        monJson = {
            MysqlId: userLog.myIdMysql,
            pseudo: userLog.pseudo,
            coordinates: {
                'longitude': longData,
                'latitude': latData
            },
            timestamp: timestampData,
            avatar: userLog.avatar
        }
        if (monJson == undefined) {} else {
            //console.log(monJson);
            return monJson;
        }


    };

    /**
     * méthode de stockage d'id sur l'appareil + coordonnées by
     * Solène + Munick
     * 
     * @param {*}
     *            data
     */
    function stockage(data) {
        var value = data.id;

        localStorage.setItem("maCle", value);

        var id = localStorage.getItem("maCle");
        console.log(id);

        var valueCoords = data.coordinates
        console.log(valueCoords);

        localStorage.setItem('coordo', JSON
            .stringify(valueCoords));
        // var coords= localStorage.setItem("coordo",
        // valueCoords);
        coordsJSON = localStorage.getItem('coordo');
        console.log(coordsJSON);
        if (coordsJSON != "") {
            idCoords = {
                "identifiant": id,
                "coordonnees": coordsJSON
            }
            console.log(idCoords);
        } else {
            alert("Problème d'identification")
            // où rediriger l'utilisateur ?
        };
    }

    function ajax(json) {
        $.ajax({
            url: server.gps.urlCreate,
            type: 'POST',
            dataType: 'json',
            async: true,
            data: json,
            success: function (result) { //function ajaxsuccess
                console.log("enregistrement en base done !");

            },
            error: function (result) {
                ajaxError(result);

            },
            complete: function (result) {

            }

        });

        function ajaxError(o) { //o est result qui est notre json
            console.log("ajax error");
        }
    }
});