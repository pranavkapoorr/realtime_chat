var express = require('express');
var mysql = require('mysql');
var app = express();
var server = require('http').createServer(app);

server.listen(40001);
console.log("server started");

app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
});