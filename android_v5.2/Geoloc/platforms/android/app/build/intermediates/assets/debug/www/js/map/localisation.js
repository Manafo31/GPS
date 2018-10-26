
    var localisation = {
        ajoutMakers1: function (myItems) {
            map = L.map('map').setView([43.604652, 1.444209], 12);
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>'
            }).addTo(map);
            myItems = JSON.parse(myItems);
            var redIcon = new L.Icon({
                iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            //removeMarker();
            var markers = new L.featureGroup(); //new obj
    
            for (var i = 0; i < myItems.length; i++) {
                var item = myItems[i];
    
                if (item.MysqlId != userLog.myIdMysql) {
                    marker = new L.marker([item.coordinates.latitude, item.coordinates.longitude]).bindPopup(item.pseudo, item.avatar);;
                    markers.addLayer(marker);
    
                } else {
    
                    markerPerso = new L.marker([monJson.coordinates.latitude, monJson.coordinates.longitude], {
                        icon: redIcon
                    }).bindPopup(item.pseudo, item.avatar);
                    //[monJson.coordinates.latitude, monJson.coordinates.longitude]
                    
    
                    markers.addLayer(markerPerso);
                }
    
            }
            map.addLayer(markers);
    
            markers.on('mouseover', function (e) {
                    e.layer.openPopup();
                })
                .on('mouseout', function (e) {
                    e.layer.closePopup();
                });
            //map.fitBounds(markers.getBounds());
            map.fitBounds([
                [(monJson.coordinates.latitude - 0.03), (monJson.coordinates.longitude + 0.03)],
                [(monJson.coordinates.latitude + 0.03), (monJson.coordinates.longitude - 0.03)]
            ]);
            localisation.rdvMarkers();
    
    
        },
        removemarkers: function () {
    
            var i = 0;
            map.eachLayer(function (layer) {
                if (i > 0) {
                    map.removeLayer(layer);
                }
                i++;
            })
        },
        centerMapUser: function () {
            /* var corner1 = L.latLng((monJson.coordinates.latitude - 0.03), (monJson.coordinates.longitude + 0.03)),
               corner2 = L.latLng((monJson.coordinates.latitude + 0.03), (monJson.coordinates.longitude - 0.03)),
               bounds = L.latLngBounds(corner1, corner2); */
            map.fitBounds([
                [(monJson.coordinates.latitude - 0.03), (monJson.coordinates.longitude + 0.03)],
                [(monJson.coordinates.latitude + 0.03), (monJson.coordinates.longitude - 0.03)]
            ]);
        },
        rdvMarkers: function () {
            $.ajax({
                url: server.rdv.url,
                type: 'GET',
                dataType: 'json',
                async: true,
                data: '',
                success: function (myItems) { //function ajaxsuccess
    
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
    
                        var marker2 = new L.marker([item.coordinates.latitude, item.coordinates.longitude], {
                            icon: greenIcon
                        }).addTo(map);
    
                        marker2.bindPopup('<tr><td>' + 'Event : ' + item.type + '</td><br><td><button class="route"><p style="display:none" class="cle">' + item.cle + '</p>Route</button></td><br><td>' + 'Date de début : ' + item.dateDebut + '</td><br><td>' + 'Date de fin : ' + item.dateFin + '</td><br><td>' + 'Infos : ' + item.description + '</td><br><td>' + item.avatar + '</td><br><td>' + 'Participants : <br>' + strParticipants + '</td><br><td></td><br>');
    
    
                    }
                    map.on('popupopen', function () {
                        $('.route').click(function () {
                            var cleRdv = $(".cle").text();
                            routing.route(cleRdv);
                            $('.route').unbind('click');
                        });
                    });
    
                    map.addLayer(markerRdv);
                    localisation.centerMapUser();
                },
                error: function (result) {
                    alert('error');
                },
                complete: function (result) {
                    // faire qq chose quand c'est fini 
                }
    
            })
        }
    };
    

    $(document).ready(function () {

    //markerUsers=ajoutMakers1();
    $("button#test1").click(function () { //eent sur btn
        //console.log(testGpsINSERT);

        //removemarkers();

        //   console.log(usersLastPosition[0]);
        //  ajoutMakers1(usersLastPosition[0]);
    });
    $("button#center").click(function () {
        localisation.centerMapUser();
    });

})