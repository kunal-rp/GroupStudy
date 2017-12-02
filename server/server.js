var express = require('express');
var mysql= require('mysql');
var path = require('path');
var bcrypt = require('bcrypt');


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
var table_user = "Users"


function generateUserID(data,connection){
    var number =  Math.floor(Math.random() * 16777216)+1;
    number = number.toString(16).toUpperCase();

    var query_user_prim = "Select * From "+ table_user + " Where `user_id` ='"+number+"'";
    connection.query(query_user_prim,function(err, results){
        if(err){
            console.log("ERROR | Generating User ID |"+err)
            generateUserID(data,connection)
        }
        else{
            if(results.length == 0){

				data['user_id'] = number;
				addUser(data,connection)
            }
            else{
                generateUserID(data,connection)
            }
        }
    });
}


function addUser(data,connection){
    var user_id = data.user_id;
    var user_name = data.user_name;
    var user_password = data.user_password;
    var query_add_prim = "INSERT INTO "+table_user + "(`user_id`, `user_name`, `user_password`, `subscribed_groups`) VALUES('"+user_id+"','"+user_name+"','"+user_password+"','-')";
    connection.query( query_add_prim , function(err_prim,results_prim) {
        if(err_prim){    
            console.log("ERROR | inserting new user |"+err_prim + "|"+query_add_prim)
            callback(err_prim)
        }
        else{
            console.log("user added :"+data.toString())
        }  
    });
}

app.get('/test',function(req,res){
   var data = {user_name:"Kunal Purohit",user_password:"password"}
   connectionPool.getConnection(function(connection_error,connection){
   		if(connection_error){
   			console.log(connection_error)
   		}
   		else{
   			  generateUserID(data,connection)
   		}
   })

});
console.log("Server Running ")