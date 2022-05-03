const express = require('express');
const cors = require('cors');

const app = express();

const datesRoute = require('../database/routes/datas');

app.use(express.json());

app.use('/data', datesRoute);

app.use(cors());

module.exports = app;
