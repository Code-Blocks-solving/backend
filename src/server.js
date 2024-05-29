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
  // const options2 = {
  //   key: fs.readFileSync('../client-key.pem'),
  //   cert: fs.readFileSync('../client-cert.pem'),
  // };
  // server = https.createServer(options2, app);
  // server.listen(process.env.HTTPS_PORT);
  server = http.createServer(app);
  server.listen(process.env.PORT);
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

// let firstClientId = null;

// io.on('connection', (socket) => {
//   //console.log('New client connected');
//   if (firstClientId === null) {
//     firstClientId = socket.id;
//     console.log('firstClientId', firstClientId);
//  }
//  socket.emit('firstClientId', firstClientId);
//  console.log('socket.id', socket.id);

//   socket.on('codeUpdate', async ({ id, code }) => {
//     try {
//       console.log('codeUpdate event received');
//       updatedCodeBlock = await CodeBlockModel.findByIdAndUpdate(id, {code}, { new: true });
//       io.emit('codeUpdate', updatedCodeBlock);
//     } catch (error) {
//       console.error(error);
//     }
//   });

//   socket.on('disconnect', () => {
//     if (socket.id === firstClientId) {
//       firstClientId = null;
//     }
//     console.log('Client disconnected');
//   });
// });

const express = require('express');
const session = require('express-session');
const socketIO = require('socket.io');
//const server = require('http').createServer(app);


app.use(session({
  secret: 'your secret',
  resave: false,
  saveUninitialized: true,
}));
let firstClientId = null;
let clientCount = 0;

io.on('connection', (socket) => {
  clientCount++;
  console.log(`Client connected. Total clients: ${clientCount}`);
  
  if (firstClientId === null) {
    firstClientId = socket.id;
    console.log('firstClientId', firstClientId);
  }
  
  socket.emit('firstClientId', firstClientId);
  console.log('socket.id', socket.id);

  socket.on('codeUpdate', async ({ id, code }) => {
    try {
      console.log('codeUpdate event received');
      updatedCodeBlock = await CodeBlockModel.findByIdAndUpdate(ObjectId(id), {code}, { new: true });
      io.emit('codeUpdate', updatedCodeBlock);
    } catch (error) {
      console.error(error);
    }
  });

  app.get('/firstClientCheck', (req, res) => {
    if (clientCount === 1) {
      res.json({ isFirstClient: true, clientId: firstClientId });
      console.log('firstClient');
    } else {
      res.json({ isFirstClient: false, clientId: firstClientId });
      console.log('not firstClient');
    }
});

  socket.on('disconnect', () => {
    if(clientCount === 0) {
      clientCount = 0;
    }
    else{
      clientCount--;
    }
   
    console.log(`Client disconnected. Total clients: ${clientCount}`);
    
    if (socket.id === firstClientId) {
      firstClientId = null;
    }
  });
});





});



module.exports = server;