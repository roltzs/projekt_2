var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var apiWorld=require('./world/apiWorld');

apiWorld(app);
app.listen(PORT);