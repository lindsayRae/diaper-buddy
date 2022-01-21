const express = require('express');
const app = express();
const port = process.env.PORT || 1234;

app.get('/api', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'Hello from server.js',
    },
  ]);
});

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
