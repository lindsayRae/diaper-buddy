const express = require('express');
const router = express.Router();

// define the home page route
router.get('/', (req, res) => {
  res.json([
    {
      id: '1',
      title: 'hello, this is data from posts.js',
    },
  ]);
});

module.exports = router;
