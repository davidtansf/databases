//db helpers
var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

module.exports = {

  getMessages: function(callback){
    this.query('SELECT * FROM messages', function(rows, fields) {
      callback(rows);
    });
  },

  postMessage: function(msgObj, callback) {
    this.query('INSERT into messages (messages) values ('+msgObj+')', function(rows, fields) {
      callback(rows);
    });
  },

  addUser: function(msgObj, callback){
    console.log(msgObj.username);
    this.query('INSERT into users(username) values ('+msgObj.username+')', function(rows, fields) {
      callback(rows);
    });
  },

  query: function(query, callback){
    var dbConnection = mysql.createConnection({
      user: "root",
      password: "",
      database: "chat"
    });

    dbConnection.connect();

    dbConnection.query( query , function(err, rows, fields) {
      if (err) {
        throw err
      }  
      callback(rows, fields);
    });
    dbConnection.end();
  }



}