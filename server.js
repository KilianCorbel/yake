var http = require('http');
var express = require('express');

var server = http.createServer();

// ---- MANAGE DATABASE
let mongoose = require('mongoose');

let database  = mongoose.connect("mongodb://localhost/yake",{
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true
});