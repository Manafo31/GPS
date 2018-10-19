         // variables latitude et longitude initialisées à vide pour le JSON
         var maTimestamp = undefined;
         var latJSON = undefined;
         var longJSON = undefined;

         insertionPosition();

         function insertionPosition() {

             navigator.geolocation.getCurrentPosition(onSuccess, onError, {
                 timeout: 3000
             });
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
                 maLat.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />';
                 maLong.innerHTML = 'Longitude: ' + position.coords.longitude + '<br />';
                 maTimes.innerHTML = 'Timestamp: ' + position.timestamp + '<br />';
             } else {
                 insertionPosition();
             };


             maTimestamp = position.timestamp;
             latJSON = position.coords.latitude;
             longJSON = position.coords.longitude;

             // contrôle des valeurs pour le JSON
             if (longJSON && latJSON != undefined) {
                maPosition(latJSON, longJSON, maTimestamp);
             } else {
                console.log("Les coordonnées GPS n'ont pas été envoyées au JSON");
             };
         };

         // en cas d'erreur
         function onError(error) {
             alert('code: ' + error.code + '\n' +
                 'message: ' + error.message + '\n' +
                 'Merci de relancer le GPS');
         }

         // methode de génération d'un json avec la position
         function maPosition(latData, longData, timestampData) {
             var monJson = undefined;

             // mon objet json 
             monJson = {
                 id: 000001,
                 pseudo: 'Munick',
                 coordinates: {
                     'lat': latData,
                     'lon': longData
                 },
                 timestamp: timestampData,
                 avatar: 'monAvatar'
             }
             if (monJson == undefined) {} else {
                 //console.log(monJson);
                 return monJson;
             }
         };

         // Stockage de l'information