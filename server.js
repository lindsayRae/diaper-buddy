require('dotenv').config();
require('express-async-errors');
const error = require('./middleware/error');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 1234;
const app = express();
const path = require('path');
const puppeteer = require('puppeteer');

app.use(cors());
app.use(express.json()); // our server can accept json in body of request

// private key ask steven
const privateKey = process.env.diapers_jwtPrivateKey;

if (!privateKey) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  // 0 is success, anything else is failure
  process.exit(1);
}

// mongoose connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri).catch((err) => {
  console.error(err.stack);
  process.exit(1);
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`MogoDB database connection established successfully`);
});

// routes
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/users');
const activateRouter = require('./routes/activate');
const authRouter = require('./routes/auth');
const kidsRouter = require('./routes/kidsRecords');
const inventoryRouter = require('./routes/inventoryRecords');
const usedRouter = require('./routes/usedRecords');

app.get('/api', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'Hello from server.js',
    },
  ]);
});

// .use
app.use('/api/posts', postsRouter);
app.use('/api/users', userRouter);
app.use('/api/activate', activateRouter);
app.use('/api/auth', authRouter);
app.use('/api/kids', kidsRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/used', usedRouter);

// app.use('*', (req, res) =>
//   res.status(404).json({ error: 'This page is not found.' })
// );

app.use(error);

app.enable('trust proxy'); // must include!!

if (process.env.NODE_ENV == 'production') {
  console.log('in test prod');
  app.use(function (req, res, next) {
    if (req.secure) {
      // request was via https, so do no special handling
      next();
    } else {
      // request was via http, so redirect to https
      res.redirect('https://' + req.headers.host + req.url);
    }
  });

  app.use(express.static('public'));
  // Serve any static file
  app.use(express.static(path.join(__dirname, 'client/build')));

  try {
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
      console.log('in try');
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  } catch (error) {
    console.log('try catch error: ', error);
  }
}

app.listen(port, () => {
  console.log(`diapers-mern2.0 app listening at http://localhost:${port}`);
});
