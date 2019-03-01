const express = require('express');
const helmet = require('helmet');

const cohortData = require('./routes/cohortRouter.js');
const studentData = require('./routes/studentRouter.js');
const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/cohorts', cohortData);
server.use('/api/students', studentData);

module.exports = server;
