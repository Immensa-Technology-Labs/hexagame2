const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
myObj = [];

app.get('/', function(req, res) {
    res.sendfile('index.html');
});

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    console.log('A user connected');

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
    socket.on('onNameEntered', (data) => {
        //broadcast the new message
        //io.sockets.emit('new_message', {message : data.message, username : socket.username});
        myObj[data] = {'Quality':'', 'Color':''};
        console.log("onNameEntered");
        console.log(data);
    })
    socket.on('next1ButtonCallback', (data) => {
        //broadcast the new message
        //io.sockets.emit('new_message', {message : data.message, username : socket.username});
        myObj[data.Name]["Quality"] = data.Quality;
        console.log("next1ButtonCallback");
        console.log(data.Quality);
    })
    socket.on('leadershipQualityEntered', (data) => {
        //broadcast the new message
        //io.sockets.emit('new_message', {message : data.message, username : socket.username});
        myObj[data.Name]["Color"] = data.Color;
        console.log("leadershipQualityEntered");
        console.log(data.Color);
    })
    socket.on('next2ButtonCallback', (data) => {
        //broadcast the new message
        //io.sockets.emit('new_message', {message : data.message, username : socket.username});
        myObj.push(data);
        console.log("next2ButtonCallback");
        io.sockets.emit('drawAllHexagons',myObj);
        //socket.emit('userExists');
    })

});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

