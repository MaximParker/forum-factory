
const express = require('express');
const app = express();
const endpoints = require('./endpoints.json')

const cors = require('cors');

const { apiRouter } = require('./routers/api.router')
const { handleCustomErrors, handleQueryErrors, handleServerErrors } = require('./errors/errors');

app.use(cors);
app.use(express.json());
app.use('/api', apiRouter);

app.get('/api', (req, res, next) => {
    res.send(endpoints);
})

app.use(handleQueryErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
