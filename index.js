var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];

server.listen(process.env.PORT || 3004);
console.log("server started");

app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
});

io.sockets.on('connection',function(socket){
    connections.push(socket);
    console.log("Connected: $s sockets connected",connections.length);
    
    socket.on('disconnect',function(data){
        users.splice(users.indexOf(socket.username),1);
        connections.splice(connections.indexOf(socket),1);
        console.log("Disconnected: $s sockets connected",connections.length);
        updateUsers();
    });

    socket.on('send message',function(data){
        console.log(data);
        io.sockets.emit('new message',{msg:data , username:socket.username});
    });
    socket.on('add user',function(data){
        //callback(true);
        socket.username = data;
        console.log("new user"+data);
        users.push(socket.username);
        updateUsers();
    });
    function updateUsers(){
        io.sockets.emit('new user',users);
    }
});