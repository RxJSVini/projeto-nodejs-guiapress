const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const connection = require('./database/db.js');
const session = require('express-session');



//Views
app.set('views', path.join(__dirname, 'views'));

//Template engine
app.set('view engine', 'ejs');

// Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())

/*
  Sessions 
  1 - 1000
  60 - 60000
*/
app.use(session({
  secret: 'uuLmEKUTVeRGluApeSgAtXq251azVzpPa',
  cookie: {
    maxAge: 15000000
  }
}));

//Rotas
app.use(require('./routes'))


//Database
try {
  connection
    .authenticate()
    .then(() => {
      console.log("0");
    })
    .catch((error) => {
      console.error(error);
    })
} catch (e) {
  throw new Error(`Erro: ${error}`);
}

module.exports = app;