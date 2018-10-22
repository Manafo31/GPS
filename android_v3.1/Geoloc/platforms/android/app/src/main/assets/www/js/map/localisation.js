$(document).ready(function () {
    $("button#test1").click(function () { //eent sur btn
        console.log(testGpsINSERT);

        $.ajax({
            url: server.gps.url,
            type: 'GET',
            dataType: 'json',
            async: true,
            data: '',
            success: function (result) { //function ajaxsuccess
                //console.log(result);
                //console.log(result[0].coordinates, result[0].pseudo);
                removemarkers();
                ajoutMakers1(result);
            },
            error: function (result) {
                alert('error');
                console.log(result);
            },
            complete: function (result) {
                // faire qq chose quand c'est fini 
                //console.log('fini');
            }
        });



        function ajoutMakers1(result) { //ajout de multimarker
            var users = result;
            var myItems = users;
            var redIcon = new L.Icon({
                iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            //console.log(myItems);
            //removeMarker();
            var markers = new L.featureGroup(); //new obj
            for (var i = 0; i < myItems.length; i++) {
                var item = myItems[i];
                if (myItems[i].MysqlId != userLog.myIdMysql) {
                    
                    //console.log(item);
                    marker = new L.marker([item.coordinates.latitude, item.coordinates.longitude]).bindPopup(item.pseudo, item.avatar);
                    markers.addLayer(marker);
                }else{
                    console.log("id trouver perso");
                    markerPerso=new L.marker([item.coordinates.latitude, item.coordinates.longitude], {
                        icon: redIcon
                    }).bindPopup(item.pseudo, item.avatar);
                    markers.addLayer(markerPerso);
                }

            }

            markers.on('mouseover', function (e) {
                    e.layer.openPopup();
                })
                .on('mouseout', function (e) {
                    e.layer.closePopup();
                });
            map.addLayer(markers);
            map.fitBounds(markers.getBounds());
        };


        const removemarkers = function () {
            var i = 0;
            map.eachLayer(function (layer) {
                if (i > 0) {
                    map.removeLayer(layer);
                    
                }
                i++;
            })

        }

        var reponse = $.ajax({
            url: server.rdv.url,
            type: 'GET',
            dataType: 'json',
            async: true,
            data: '',
            success: function (result) { //function ajaxsuccess
                /* console.log(result);
                console.log(result[0].coordinates, result[0].pseudo); */
                var users = result;
                var myItems = users;
                //console.log(myItems);

                var greenIcon = new L.Icon({
                    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                });

                var markerRdv = new L.featureGroup(); //new obj
                for (var i = 0; i < myItems.length; i++) {
                    
                    var item = myItems[i];
                    var participants = item.participant;
                    
                    
                    var strParticipants = "";
                    for (var j = 0; j < participants.pseudo.length; j++) {
                        strParticipants += '<td>' + participants.pseudo[j] + '<br></td></tr>';
                    }
                    
                    marker2 = new L.marker([item.coordinates.latitude, item.coordinates.longitude], {
                        icon: greenIcon
                    }).bindPopup('<tr><td>' + item.type + '</td><br><td><button id="test3">Route</button></td><br><td>' + item.dateDebut + '</td><br><td>' + item.dateFin + '</td><br><td>' + item.description + '</td><br><td>' + item.avatar + '</td><br>' + strParticipants).openPopup();;
                    markerRdv.addLayer(marker2);
                }
                /*    markers.on('mouseover', function (e) {
                           e.layer.openPopup();
                       })
                       .on('mouseout', function (e) {
                           e.layer.closePopup();
                       }); */
                map.addLayer(markerRdv);
                map.fitBounds(markerRdv.getBounds());

            },
            error: function (result) {
                alert('error');

            },
            complete: function (result) {
                // faire qq chose quand c'est fini 
            }

        });
    });
});