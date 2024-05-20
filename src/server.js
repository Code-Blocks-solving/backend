const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const socketIo = require('socket.io');
const initApp = require('./app');
const cors = require('cors');
CodeBlockModel = require('./models/code_block_model');

const app = express();
let server;



initApp().then((app) => {
if (process.env.NODE_ENV !== 'production') {
  console.log('development');
  server = http.createServer(app);
  server.listen(process.env.PORT);
} else {
  console.log('PRODUCTION');
  const options2 = {
    key: fs.readFileSync('../client-key.pem'),
    cert: fs.readFileSync('../client-cert.pem'),
  };
  server = https.createServer(options2, app);
  server.listen(process.env.HTTPS_PORT);
}


app.use(cors()); 
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allow GET and POST methods
    allowedHeaders: ["my-custom-header"], // Allow specific custom headers
    credentials: true // Allow cookies
  }
});



//const io = socketIo(server);
let firstClientId = null;

io.on('connection', (socket) => {
  console.log('New client connected');
  if (firstClientId === null) {
    firstClientId = socket.id;
 }
 socket.emit('firstClientId', firstClientId);


  socket.on('codeUpdate', async ({ id, code }) => {
    try {
      console.log('codeUpdate event received');
      updatedCodeBlock = await CodeBlockModel.findByIdAndUpdate(id, {code}, { new: true });
      io.emit('codeUpdate', updatedCodeBlock);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

});

module.exports = server;