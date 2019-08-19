/**
 * Created by azu on 2014/02/21.
 * LICENSE : MIT
 */
"use strict";
var fs = require("fs");
var pather = require("path");
var FS = require("q-io/fs");
var Promise = require("q");
var getTitle = require("get-html-title");
var Handlebars = require("handlebars");
function pLoadFileList(fileList) {
    return Promise.all(fileList.map(function (filePath) {
        return FS.read(pather.resolve(filePath)).then(JSON.parse).catch(function (error) {
            console.log(error);
        });
    }));
}
var rootDir = pather.join(__dirname, "..");
var concatPromise = FS.listTree(rootDir, function isIndexHTML(filePath, stat) {
    if (stat.isDirectory()) {
        return false;
    }
    // root 直下は除外
    if (pather.dirname(pather.resolve(rootDir, filePath)) === rootDir) {
        return false;
    }
    // ignore rule
    var ignoreRule = /(\/theme\/|reveal\.js|landslide-theme|node_modules)/;
    if (ignoreRule.test(filePath)) {
        return false;
    }

    return pather.extname(filePath) === ".html";
});

(async () => {
    const list = await concatPromise;
    list.forEach(filePath => {
        const url = filePath.replace(rootDir, "https://azu.github.io/slide").replace("index.html", "");
        const content = fs.readFileSync(filePath, "utf-8");
        const rewriteContent = content.replace("</head>", `
<link rel="canonical" href="${url}">
<link rel="author" href="https://www.hatena.ne.jp/efcl/" />
</head>`);
        fs.writeFileSync(filePath, rewriteContent, "utf-8");
    })
})()