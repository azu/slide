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
var rootDir = "../";
var concatPromise = FS.listTree(rootDir, function isIndexHTML(filePath, stat) {
    if (stat.isDirectory()) {
        return false;
    }

    // ignore rule
    var ignoreRule = /(reveal\.js|landslide-theme|node_modules)/;
    if (ignoreRule.test(filePath)) {
        return false;
    }

    return pather.extname(filePath) === ".html";
});

function getTitleFromHTMLPath(filePath) {
    var content = fs.readFileSync(filePath, "utf-8");
    return getTitle(content);
}
// ディレクトリレベルでグルーピングする
/*
    "dir" : [
        file...
    ]
 */
function groupingFileList(fileList) {
    var listObject = {};
    fileList.forEach(function (filePath) {
        var keyName = pather.dirname(filePath).split(pather.sep).pop();
        if (listObject[keyName] == null) {
            listObject[keyName] = [];
        }
        var title = getTitleFromHTMLPath(filePath);
        if (title != null) {
            listObject[keyName].push({
                filePath: pather.relative(rootDir, filePath),
                title: title
            });
        }
    });

    return listObject
}
Handlebars.registerHelper('link_to', function () {
    return new Handlebars.SafeString("<a href='" + Handlebars.Utils.escapeExpression(this.filePath) + "'>" + Handlebars.Utils.escapeExpression(this.title) + "</a>");
});
function compileToHTML(fileListObject) {
    var context = { object: fileListObject };
    var source = fs.readFileSync("./index-template.hbs", "utf-8");
    var template = Handlebars.compile(source);
    return template(context);
}
var fileListObject = concatPromise.then(groupingFileList);
fileListObject.then(function (result) {
    var generatedHTML = compileToHTML(result);

    return fs.writeFileSync(pather.resolve(rootDir, "./index.html"), generatedHTML);
}).catch(console.error.bind(console));