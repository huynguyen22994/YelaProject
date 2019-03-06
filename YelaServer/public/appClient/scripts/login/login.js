//Google Login
function onLoadFunction() {
    gapi.client.setApiKey('AIzaSyAlwdeQyEcDwuDVui9r8z3-TQ51LO8pU-U');
    gapi.client.load('plus', 'v1', function(){});
}