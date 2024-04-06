'use strict'
const express = require('express');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Define REST endpoints
app.use('/api',require('./routes/api/index'));
//
const PORT=50000;
app.listen(process.env.PORT||PORT,()=>
{
    console.log(`Gateway is running at Port: ${process.env.PORT||PORT}`);
});

module.exports = app;
