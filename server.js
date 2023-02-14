console.log('heyworlds');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

//make static html server here
app.use(express.static('public'));

io.on("connection", (socket) => {
    socket.on("magUpdate", (incomingData) => {
      console.log(incomingData); // data
      io.emit("clientUpdate", incomingData);
    });
  });

//turn server on
server.listen(3000,serverOn);

function serverOn(){
    console.log('server started on port 3000');
};

