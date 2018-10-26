$(document).ready(function () {
    console.log("coucou websocket ")
    $("button#websocket").click(function () {
        console.log("coucou websocket click");
        integrationWebsocket();
    })
});




function integrationWebsocket() {
    $.ajax({
        url: "./template/websocket.html",
        type: 'GET',
        dataType: 'html',
        async: true,
        data: '',
        success: function (result) {
            console.log("chargement websocket.html dans div main");
            $("body").html(result);
        },
        error: function (result) {
            console.log("erreur ajax");
            $("body").html("");

        },
        complete: function (result) {
            console.log('Terminus');
        }
    })
};