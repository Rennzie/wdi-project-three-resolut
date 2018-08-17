const express = require('express');
const { port, dbURI } = require('./config/environment');

//internal modules
const bodyParser = require('body-parser');
const router = require('./config/routes');
const mongoose = require('mongoose');

//MongoDB
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const app = express();

//Middleware
app.use(bodyParser);

// Add CORS headers (cross origin resources server) to get around chromes security features
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static(`${__dirname}/public`));

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use('api', router);

app.listen(port, () => console.log(`Express is running on port ${port}`));


module.exports = app;
