const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const routes = require('express').Router();
const user = require('./user');

routes.use('/user', user);
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));


module.exports = routes;
