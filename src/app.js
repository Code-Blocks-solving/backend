const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const codeBlockRoute = require('./routes/code_block_route');
console.log('initApp');
const session = require('express-session');

// const initApp = () => {
//   const promise = new Promise((resolve) => {
//     const db = mongoose.connection;
//     db.once('open', () => console.log('Connected to Database'));
//     db.on('error', (error) => console.error(error));
//     const url = 'mongodb://localhost/moveo';
//     mongoose.connect(url).then(() => {
//       const app = express();
//       app.use(express.json());
//       app.use(express.urlencoded({ extended: true }));
//       app.use((req, res, next) => {
//         res.header('Access-Control-Allow-Origin', '*');
//         res.header('Access-Control-Allow-Methods', '*');
//         res.header('Access-Control-Allow-Headers', '*');
//         res.header('Access-Control-Allow-Credentials', 'true');
//         next();
//       });
//       app.use('/codeblock', codeBlockRoute);
//       app.use('/public', express.static('public'));
//       resolve(app);
//     });
//   });
//   return promise;
// };

// module.exports = initApp;


const initApp = async () => {
  try {
    const db = mongoose.connection;
    db.once('open', () => console.log('Connected to Database'));
    db.on('error', (error) => console.error(error));
    const url = 'mongodb://localhost/moveo';

    // Wait for mongoose to connect
    await mongoose.connect(url);

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', '*');
      res.header('Access-Control-Allow-Headers', '*');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
    app.use('/codeblock', codeBlockRoute);
    
    // Add more middleware or routes as needed
    
    return app;
  } catch (error) {
    console.error('Error during app initialization:', error);
    throw error; // Re-throw the error to propagate it up
  }
};

module.exports = initApp;