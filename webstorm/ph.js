if (phantom.args.length === 0 || phantom.args.length > 2){
    console.log('Usage: run-qunit.js URL output.html');
    phantom.exit(1);
}

var page = require('webpage').create();
var fs = require('fs');
// Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
page.onConsoleMessage = function(msg){
    console.log(msg);
};

page.open(phantom.args[0], function(status){
    if (status !== "success"){
        console.log("Unable to access network");
        phantom.exit(1);
    }else{
        var convertedPage = page.evaluate(function(){
            function convertAllImgBase64(doc){
                doc = doc || document;
                var imgList = doc.getElementsByTagName("img");
                for (var i = 0; i < imgList.length; i++){
                    console.log(imgList[i].src);
                    var elem = imgList[i];
                    var canvas = doc.createElement('canvas');
                    canvas.width = elem.width;
                    canvas.height = elem.height;
                    elem.parentNode.insertBefore(canvas, elem);
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(elem, 0, 0);
                    var img = doc.createElement("img");
                    img.src = canvas.toDataURL("image/png");
                    elem.parentNode.replaceChild(img, elem);
                    canvas.parentNode.removeChild(canvas);
                }
                return doc.documentElement.innerHTML;
            }

            return convertAllImgBase64(document);
        });
        fs.write(fs.workingDirectory + "/" + phantom.args[0], convertedPage, "w");
        phantom.exit(0);
    }


});
