const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const createErrors = require('http-errors');


const port = process.env.PORT || 8080;
const app = express();

app.get('/auth', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
  );
});

app.get('/oauth-callback', ({ query: { code } }, res) => {
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code,
  };
  const opts = { headers: { accept: 'application/json' } };
  axios
    .post('https://github.com/login/oauth/access_token', body, opts)
    .then((_res) => _res.data.access_token)
    .then((token) => {
      // eslint-disable-next-line no-console
      console.log('My token:', token);

      res.redirect(`/?token=${token}`);
    })
    .catch((err) => res.status(500).json({ err: err.message }));
});


// Handling Errors
app.use((err, req, res, next) => {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
    //next(createError(404, 'NOt Found'));
});

app.use(express.static('static'));

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