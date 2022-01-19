const express = require('express');
const app = express();
//const endpoints = require('./endpoints.json')

const { apiRouter } = require('./routers/api.router')
const { handleCustomErrors, handleQueryErrors, handleServerErrors } = require('./errors/errors');

app.use(express.json());
app.use('/api', apiRouter);
/* 
app.get('/api', (req, res, next) => {
    res.send(endpoints);
});
 */
// ERROR HANDLERS ================================================
app.use(handleQueryErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
