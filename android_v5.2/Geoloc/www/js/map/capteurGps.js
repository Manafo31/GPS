var maTimestamp = undefined;
var latJSON = 0;
var longJSON = 0;
var watchID = null;
userLog.myIdMysql = "03";
userLog.pseudo = "solene";
userLog.avatar = "http://avatar.fr/03.jpg";

$(document).ready(function () {
    //ecoute du bouton
    $("#AppConnection").click(function () { //eent sur btn

        insertionPosition();
    });



    /**
     * Fonction websocket envoie nouvelle position gps user au websocket server 
     */
    function insertionPosition() {
        // Throw an error if no update is received every 30 seconds
        watchID = navigator.geolocation.watchPosition(onSuccessRefresh, onErrorRefresh, {
            enableHighAccuracy: true,
            timeout: 20000

        });
        /**
         * 
         * @param {*} position 
         */
        function onSuccessRefresh(position) {
            var comparLat = Math.abs(latJSON - position.coords.latitude);
            var comparLong = Math.abs(longJSON - position.coords.longitude);
            // comparLat => si difference de 0.001 = 110m de dif latitude 0.0001 = 10m
            // comparLong => si difference de 0.001 = 80m de dif latitude 0.0001 = 10m

            if (comparLat > 0.0005 || comparLong > 0.0005) {
                alert("vous avez bougé de 50m");
                maTimestamp = position.timestamp;


                var maLat = document.getElementById('lat');
                var maLong = document.getElementById('long');
                var maTimes = document.getElementById('times');

                latData = position.coords.latitude;
                longData = position.coords.longitude;
                timestampData = position.timestamp;

                // gestion d'erreur des valeurs de la position
                if (position.coords.latitude != undefined &&
                    position.coords.longitude != undefined &&
                    position.timestamp != undefined) {/* 
                    maLat.innerHTML = 'Latitude: ' +
                        latData + '<br />';
                    maLong.innerHTML = 'Longitude: ' +
                        longData + '<br />';
                    maTimes.innerHTML = 'Timestamp: ' +
                        timestampData + '<br />'; */

                    // génération d'un json avec la position
                    // mon objet json :
                    monJson = {
                        MysqlId: userLog.myIdMysql,
                        pseudo: userLog.pseudo,
                        coordinates: {
                            'latitude': latData,
                            'longitude': longData
                        },
                        timestamp: timestampData,
                        avatar: userLog.avatar
                    }

                    socket.emit('userPosition', monJson);
                    websocket7();

                    //console.log(typeof monJson);
                    stockage(monJson);

                } else {
                    insertionPosition();
                };

                maTimestamp = position.timestamp;
                latJSON = position.coords.latitude;
                longJSON = position.coords.longitude;
                $("button#test1").trigger('click');
            }
            console.log("position non changée");

        }

        // onError Callback receives a PositionError object
        //
        function onErrorRefresh(error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }
    }


    /**
     * websocket debug
     */
    function websocket7() {
        // on envoie "identifiant" (la clé )
        socket.emit('identifiant', userLog.myIdMysql);
        socket.emit('info', userLog.myIdMysql);

        // On affiche  quand le serveur nous envoie un "info"
        socket.on('info', function (info) {
            console.log({
                info
            })
        })
        socket.on('position', function (position) {
            console.log({
                position
            })
        })
        socket.on('usersLastPosition', function (usersLastPosition) {
            
            console.log("coucou userLastposition")
            console.log(usersLastPosition);
            //localisation.removemarkers();
            localisation.ajoutMakers1(usersLastPosition);
            
            //markerUsers()

            
        })

        socket.on('disconnect', () => {
            console.log('disconnected from server')
        });



    }

    /**
     * méthode de stockage d'id sur l'appareil 
     * 
     * @param {*}
     *            data
     */
    function stockage(data) {

        var value = data.MysqlId;
        localStorage.setItem("maCle", value);

        var id = localStorage.getItem("maCle");
        //console.log(id);

        var valueCoords = data.coordinates
        //console.log(valueCoords);

        localStorage.setItem('coordo', JSON
            .stringify(valueCoords));
        // var coords= localStorage.setItem("coordo",
        // valueCoords);
        coordsJSON = localStorage.getItem('coordo');

        //console.log(coordsJSON);
        if (coordsJSON != "") {
            idCoords = {
                "identifiant": id,
                "coordonnees": coordsJSON
            }
            console.log(idCoords);
        } else {
            alert("Problème d'identification")
        };
    }


    /**
     * Fonction ajax de creation en base 
     * @param {*} json 
     */
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
            complete: function (result) {}
        });

        function ajaxError(o) { //o est result qui est notre json
            console.log("ajax error");
        }

    }

});