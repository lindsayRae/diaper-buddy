# package descriptions

## express

web framework for node

## cors

const cors = require('cors');
provides connect/express middleware that can enable Cross Origin Resource Sharing. Browser needs to see the Header: 'Access-Control-Allow-Origin'. This is a browser security feature

app.use(cors());
enable cores for all routes
[Github Repo](https://github.com/expressjs/cors)

## mongoose

const mongoose = require('mongoose');
a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
[docs](https://mongoosejs.com/)

dotenv
