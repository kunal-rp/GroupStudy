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


app.get('/addUser',function(req,res){
	var given_user_name = req.get("user_name");
	console.log(req.query)
	var given_user_password = req.get("user_password");

	if(given_user_name == undefined || given_user_password == undefined){
		res.send("Error");
	}
	else{
		var data = {user_name:given_user_name,user_password:given_user_password}
		connectionPool.getConnection(function(connection_error,connection){
			if(connection_error){
				console.log(connection_error)
			}
			else{
				generateUserID(data,connection,function(){res.send("Done")})
			}
		})
	}
});


console.log("Server Running ")


//_________\\

function generateUserID(data,connection,callback)
    {
        var number =  Math.floor(Math.random() * 16777216)+1;
        number = number.toString(16).toUpperCase();

        var query_user_prim = "Select * From "+ table_user + " Where `user_id` ='"+number+"'";
        connection.query(query_user_prim,function(err, results){
            if(err){
                console.log("ERROR | Generating User ID |"+err)
                addUser(data,connection,callback)
            }
            else{
                if(results.length == 0){

                    data['user_id'] = number;
                    callback(data,connection)
                }
                else{
                    generateUserID(data,connection,callback)
                }
            }
        });
    }

function addUser(data,connection,callback){
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
        callback()
      }  
    });
  }



