// LICENSE : MIT
"use strict";

var canvas = document.getElementById("js-canvas");
var fetchImage = require("../lib/fetchImage");
fetchImage("../img/toa.jpg").then(function (image) {
    require("../lib/canvasUtil").fitCanvasWithImage(canvas, image);
    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0,
        image.width, image.height);
}).catch(function (error) {
    console.log(error.stack);
    console.log(error);
});

function render() {
    return fetchImage("../img/toa.jpg").then(function (image) {
        return require("../lib/encodePuzzle")(canvas, image).then(function (result) {
            return result
        });
    });
}
document.getElementById("js-encode-button").addEventListener("click", function () {
    render().catch(function (error) {
        console.log(error.stack);
        console.log(error);
    });
});
document.getElementById("js-save-button").addEventListener("click", function () {

    function saveJSON(result) {
        var JSONBlob = new Blob(
            [JSON.stringify(result.imageMeta)],
            {type: 'application/json'}
        );
        window.saveAs(JSONBlob, "encoded.json");
    }

    render().then(function (result) {
        saveJSON(result);
        require("../lib/canvasUtil").saveCanvas(canvas, "encoded.png", saveJSON());
    }).catch(function (error) {
        console.log(error.stack);
        console.log(error);
    });
    ;
});