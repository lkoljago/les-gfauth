const express   = require('express');
const https     = require('https');
const fs        = require('fs');
const colors    = require('colors');
const bodyParser = require('body-parser');
const morgan    = require('morgan');
const mongoose  = require('mongoose');
const cors = require('cors');

const app       = express();
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/gauth', { useNewUrlParser: true, useUnifiedTopology: true }, console.log('DB connected'.blue));
const routesUsers = require('./routes/users');
//middlewear
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));
app.use(bodyParser.json({ limit: '25mb', extended: true }));


//routes
app.use('/users', routesUsers);

//controllers

//start the server
const port = 9000;
app.listen(port, () => {
  console.log(`BE server listening on port ${port}`.blue);
});
module.exports = app;