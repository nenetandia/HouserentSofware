const mysql = require('mysql');

require('dotenv').config(); 

let db; 
let db_config_pool = { 
    //connectionLimit : 100, 
    host : process.env.HOST, 
    user : process.env.USER, 
    password: process.env.PASSWORD, 
    database: process.env.DATABASE_NAME 
}; 
console.log('process.env.HOST',process.env.HOST) 
console.log('process.env.USER',process.env.USER) 
console.log('process.env.PASSWORD',process.env.PASSWORD) 
console.log('process.env.DATABASE_NAME',process.env.DATABASE_NAME) 

    function reconnect(connection){ 
        console.log("\n New connection tentative..."); 

        //- Destroy the current connection variable 
        if(connection) connection.destroy(); 

        //- Create a new one 
        //var connection = mysql_npm.createConnection(db_config); 
        var connection = mysql.createConnection(db_config_pool); 

        //- Try to reconnect 
        connection.connect(function(err){ 
            if(err) { 
                //- Try to connect every 2 seconds. 
                setTimeout(reconnect, 2000); 
            }else { 
                console.log("\n\t * New connection established with the database. *") 
                return connection; 
            } 
        }); 
    } 
    //var connection  = mysql.createPool(db_config_pool); 
    var connection = mysql.createConnection(db_config_pool); 

    //- Establish a new connection 
    connection.connect(function(err){ 
        if(err) { 
            // mysqlErrorHandling(connection, err); 
            console.log("\n\t * Cannot establish a connection with the database. *"); 

            connection = reconnect(connection); 
        }else { 
            console.log("\n\t * New connection established with the database. *") 
        } 
    }); 

    //- Error listener 
    connection.on('error', function(err) { 

        //- The server close the connection. 
        if(err.code === "PROTOCOL_CONNECTION_LOST"){     
            console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")"); 
            connection = reconnect(connection); 
        } 

        //- Connection in closing 
        else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){ 
            console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")"); 
            connection = reconnect(connection); 
        } 

        //- Fatal error : connection variable must be recreated 
        else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){ 
            console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")"); 
            connection = reconnect(connection); 
        } 

        //- Error because a connection is already being established 
        else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){ 
            console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")"); 
        } 

        //- Anything else 
        else{ 
            console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")"); 
            connection = reconnect(connection); 
        } 

    }); 

    //return connection; 

    setInterval(function(){  
        try { 
            if(!connection){ 
                connection= mysql.createConnection(db_config_pool); 
            } 
            connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) { 
                if (error){connection = reconnect(connection);} 
                //console.log('The solution is: ', results[0].solution); 
            }); 
        } catch (error) { 
            connection = reconnect(connection); 
        } 
    }, 3000); 

    module.exports = connection; 













// // --------- database--------------

// const Connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "houserent"
 
//   });
  
//   Connection.connect();

// //   - - - - - Tester database - - -  - - - - - 
//   Connection.query('select 1 + 1 AS sum', function(error, results, fields) {
//       if (error) throw error;
//       console.log('the solution is', results[0].sum);

//   });

