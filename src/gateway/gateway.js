'use strict'
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();
app.use(cors());

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Define REST endpoints
app.use('/api',require('./routes/api/index'));
//
const PORT=80;
app.listen(PORT,()=>
{
    console.log(`Gateway is running at Port: ${PORT}`);
});

module.exports = app;
