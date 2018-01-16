const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const UsersService = require('./UsersService');

const userService = new UsersService();
console.log(userService.getAllUsers());

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});



io.on('connection', function(socket){
	console.log(socket.id);
	socket.on('join', function(name){
		userService.addUser({
			id: socket.id,
			name
		});
		io.emit('update', {
			users: userService.getAllUsers()
		});
	});

  	socket.on('disconnect', () => {
    	userService.removeUser(socket.id);
    	socket.broadcast.emit('update', {
      	users: userService.getAllUsers()
    	});
  	});

  	socket.on('message', function(message){
  		const d = new Date();
  		const messageDate = '[' + d.getHours() + ' : ' + d.getMinutes() + ' : ' + d.getSeconds() +']';
  		//console.log(message);
    	const {name} = userService.getUserById(socket.id);
    	io.emit('message', {
      		text: message.text,
      		from: name,
      		time: messageDate
    	});
 	});
 	
 	socket.on('delete', function (time, text) {
 		console.log('time: ' + time);
 		console.log('text: ' + text);
 		io.emit('deleteThis', time, text);	
 	});
});

server.listen(3000, function(){
	console.log('listening on *:3000');
});