const express =  require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  


  socket.on('chat message to server', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message to client', msg);
  });


  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });


});


http.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});