const express = require('express');
const app = express();
app.use(express.json());

const { apiRouter } = require('./routers/api.router')
const { handleCustomErrors, handleQueryErrors, handleServerErrors } = require('./errors/errors');

app.use('/api', apiRouter);

// ERROR HANDLERS ================================================
app.use(handleQueryErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
