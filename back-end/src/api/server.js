const express = require('express');
const cors = require('cors');

const app = express();

const datesRoute = require('../database/routes/datas');

app.use(cors());
app.use(express.json());
app.use('/', express.static(`${__dirname}/build`));
app.use('/data', datesRoute);

app.get('/avaliacao-online', (req, res) => res.sendFile(`${__dirname}/build/index.html`));

app.get('/avaliacao-cautelar', (req, res) => res.sendFile(`${__dirname}/build/index.html`));

module.exports = app;
