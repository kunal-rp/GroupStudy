var express = require('express');
var mysql= require('mysql');
var path = require('path');


process.on('uncaughtException', function (err) {
  console.log(err);
});

app = express();
var server = app.listen(3000,'0.0.0.0');

app.use(express.static('public'));


//Connection to SQL DB
//NEED to create two seperate connections for user_prim and general uses for security 
var connectionPool = mysql.createPool({
	connectionLimit:50,
	host: 'localhost',
	user: 'username',
	password: 'password',
	database: 'GroupStudy',
	port:3307
});

console.log("Server Running ")