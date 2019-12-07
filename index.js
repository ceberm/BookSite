var port = '8000';
var express = require('express');
var bodyParser = require('body-parser');
const adminRoutes = require("./routes/admin");

var app = express();

process.env.PWD = process.cwd();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(process.env.PWD + '/images'));

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Book app listening at http://%s:%s", host, port)
})

app.use(adminRoutes);