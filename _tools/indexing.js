/**
 * Created by azu on 2014/02/21.
 * LICENSE : MIT
 */
"use strict";
var fs = require("fs");
var pather = require("path");
var FS = require("q-io/fs");
var Promise = require("q");

function pLoadFileList(fileList) {
    return Promise.all(fileList.map(function (filePath) {
        return FS.read(pather.resolve(filePath)).then(JSON.parse).catch(function (error) {
            console.log(error);
        });
    }));
}
var concatPromise = FS.listTree("../", function isIndexHTML(filePath, stat) {
    if (stat.isDirectory()) {
        return false;
    }

    // ignore rule
    var ignoreRule = /(reveal\.js|landslide-theme|node_modules)/;
    if(ignoreRule.test(filePath)){
        return false;
    }

    return pather.extname(filePath) === ".html";
}).then(function (fileList) {
    return fileList
});

concatPromise.then(function (array) {
    console.log(array);
}).then(function (result) {
    console.log("All Finish");
});