import express = require('express');
import cors = require('cors');
import bodyParser = require('body-parser');
import errorHandler from './helpers/error-handler';
import authenticate from './auth/authenticate';
import authenticateController from './auth/authenticate.controller';
import dataController from './data/data.controller';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// global error handler
app.use(errorHandler);

// api routes
app.post('/authenticate', authenticateController); // public
app.get('/data', authenticate, dataController); // private

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));

