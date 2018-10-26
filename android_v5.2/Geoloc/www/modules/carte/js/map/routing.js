var start = {
    longitude: String,
    latitude: String
}
var end = {
    longitude: String,
    latitude: String
}

var routing = {
    route: function (cleRdv) {
        console.log("go route touter ");
        start.longitude = monJson.coordinates.longitude;
        start.latitude = monJson.coordinates.latitude;

        this.getEnd(cleRdv);

    },
    getEnd: function (cleRdv) {
        $.ajax({
            url: server.rdv.urlSelectCle + cleRdv,
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function (result5) { //function ajaxsuccess
                end.latitude = result5[0].coordinates.latitude;
                end.longitude = result5[0].coordinates.longitude;
                routing.routingTrace();
            },
            error: function (result5) {
                alert('error');
                //console.log(result5);
            },
            complete: function (result5) {
                // faire qq chose quand c'est fini 
                //console.log('fini');
            }
        });
    },
    routingTrace: function () {
        
         L.Routing.control({
            waypoints: [
                L.latLng(start.latitude, start.longitude),
                L.latLng(end.latitude, end.longitude)
            ],
            useZoomParameter: false,
            autoRoute: false,
        }).addTo(map); 
    }
}
$(document).ready(function () {});