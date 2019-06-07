const express = require('express');
const helmet = require('helmet');

const projectRoutes = require('./resources/projectRouter');
const actionRoutes = require('./resources/actionRouter');

const server = express();

server.use(express.json());
server.use('/', logger, projectRoutes);
server.use('/actions', actionRoutes);
server.use(helmet());



function logger(req, res, next) {
    const now = new Date().toISOString();
    console.log(`A ${req.method} request to '${req.url}'at ${now}`);
  next();
  };
  

module.exports = server;