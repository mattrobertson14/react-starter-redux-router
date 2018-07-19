var express = require('express');
var path = require('path');

var app = express();

var apiRoute = require('./api');

app.use('/api', apiRoute);
app.use(express.static(path.join(__dirname, '../build')));
app.use((req, res, next) => { return res.sendFile( path.join(__dirname, '../build/index.html'))});

module.exports = app;
