require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT; // || 1234;
const app = express();
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

app.use('*', (req, res) => res.status(404).json({ error: 'Page not found' }));

if (process.env.NODE_ENV === 'production') {
  // Serve any static file
  app.use(express.static(path.join(_dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`diapers-mern2.0 app listening at http://localhost:${port}`);
});

// puppeteer
// (async () => {
//   //! change headless to true when finished with code
//   console.log('running pupperteer...');
//   const url =
//     'https://www.target.com/p/huggies-little-snugglers-diapers-huge-pack-size-3-136ct/-/A-53551102';

//   const browser = await puppeteer.launch({ headless: false });
//   console.log(url);
//   const page = await browser.newPage();
//   await page.goto(url);
//   // await page.waitForSelector(
//   //   '.style__PriceFontSize-sc-1o3i6gc-0.kfATIS.h-text-bold'
//   // );
//   await page.waitForSelector(
//     '.styles__CurrentPriceFontSize-sc-1mdemp3-1.dIeiFm'
//   );

//   const grabData = await page.evaluate(() => {
//     // works for target format
//     const formatCount = (str) => {
//       let num = str.replace(/[^0-9]/g, '');
//       return num[0] == 0 ? (num = num.replace('0', '.')) : (num = `.${num}`);
//     };
//     let priceTag = document.querySelector(
//       '.styles__CurrentPriceFontSize-sc-1mdemp3-1.dIeiFm'
//     ).innerText;
//     console.log('priceTag: ', priceTag);
//     let unitPrice = document.querySelector(
//       '.h-text-sm.h-text-grayDark'
//     ).innerText;
//     unitPrice = formatCount(unitPrice);
//     return { priceTag, unitPrice };
//   });

//   console.log(grabData);

//   await browser.close();
// })();
