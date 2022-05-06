const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const cors = require('cors');
const path = require('path');


const port = process.env.PORT || 3000;
const app = express();



app
  .use(bodyParser.json())
  .use(cors())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

 mongodb.initDb((err, mongodb) => {
   if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
   }
 });