const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors');
const app = express(); 
const setup = require('./setup');

app.set('secret', setup.token.secret);

app.set('host', setup.appServer.host);
app.set('port', setup.appServer.port);

const corsOptions = {
  exposedHeaders: ['x-access-token']
};

app.use(cors(corsOptions));
//app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({                       
//    extended: true                                    
// }));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
//app.use(bodyParser.json());

app.use((req, res, next) => {
  const jwToken = req.headers['x-access-token'];
  if(!jwToken) {
      console.log('No token is send by the the application');
  }
  next();
});

const routes = require('../app/routes/routes.js'); 
routes(app); 

module.exports = app; 
