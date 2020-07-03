/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const createMessage = require('./message/messages');
const { saveRoom, getRoomByName, getAllRooms } = require('./room/roomService');
const User = require('./user/User');
const Room = require('./room/Room');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));
/*
 * io.on() listen to a new connection.
 * io.emit() emits an event on all connections.
 * io.to() emits an event on all connections for one room.
 * Socket.emit() emits an event on a single connection.
 * Socket.on() listen to a new client call.
 * Socket.broadcast.emit() sent to everyone but not that particular socket
 * Socket.broadcast.to().emit() sent to everyone in a room but not that particular socket
 */

const welcomeMessage = (socket, user) => {
  socket.emit('message', {
    data: createMessage('Message', `Welcome ${user.getName()}!`),
    user: {
      name: 'Admin'
    }
  });
};

io.on('connection', (socket) => {
  socket.on('join', ({ username, roomName }, callback) => {
    // clear data
    const usernameCleared = username.trim().toLowerCase();
    const roomNameCleared = roomName.trim().toLowerCase();

    const room = getRoomByName(roomNameCleared) || new Room(roomNameCleared);

    saveRoom(room);

    const user = new User(socket.id, usernameCleared);

    const foundUser = room.findUserByName(user.getName());

    if (foundUser) {
      return callback({ message: 'userName is in use' });
    }

    socket.join(room.getName());

    room.addUser(user);

    welcomeMessage(socket, user);

    socket.broadcast.to(room.getName()).emit('message', {
      data: createMessage('Message', `${user.getName()} has joined!`),
      user
    });

    io.to(room.getName()).emit('roomdata', room);

    return callback();
  });

  socket.on('sendMessage', (message) => {
    const { text } = message;
    const rooms = getAllRooms();

    const indexRoom = rooms.findIndex((element) =>
      element.findUserById(socket.id)
    );

    if (indexRoom !== -1) {
      const room = rooms[indexRoom];
      const user = room.findUserById(socket.id);

      io.to(room.getName()).emit('message', {
        data: createMessage('Message', text),
        user
      });
    }
  });

  socket.on('disconnect', () => {
    const rooms = getAllRooms();
    const indexRoom = rooms.findIndex((element) =>
      element.findUserById(socket.id)
    );

    if (indexRoom !== -1) {
      const room = rooms[indexRoom];
      const user = room.deleteUser(socket.id);

      io.to(room.getName()).emit('message', {
        data: createMessage('Message', `${user.getName()} has left!`),
        user
      });
      io.to(room.getName()).emit('roomdata', room);
    }
  });

  socket.on('sendLocation', (coords, callback) => {
    const { latitude, longitude } = coords;
    io.emit(
      'locationMessage',
      createMessage(
        'LocationMessage',
        `https://google.com/maps?q=${latitude},${longitude}`
      )
    );
    callback();
  });
});

// eslint-disable-next-line no-console
server.listen(port, () => console.log(`app listen on port ${port}`));
