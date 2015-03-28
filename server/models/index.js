//connects to the database
var db = require('../db/index.js');



module.exports = {
  messages: {
    get: function(callback){
      db.query('SELECT messages.message, users.user_name FROM \
        messages left outer join users on (messages.userId = users.user_id) \
        order by messages.messageId ASC', function(err, rows, fields) {
        if (err) {
          throw err
        }  
        callback(rows, fields);
      });
    },

    post: function(msgObj, callback) {
      // console.log("Database Posting Message:", msgObj);
      module.exports.users.post(msgObj, function(){

        var qry = "INSERT INTO messages (message,userId) VALUES \
                  (?, (select user_id from users where user_name = ?))";

        db.query(qry, [msgObj.message, msgObj.username], function(rows, fields) {
          callback(rows, fields);
        });
      });
      
    },
  },

  users: {
    get: function (name, callback) {
      db.query('SELECT * FROM users WHERE user_name = ?', [name], function(err, rows, fields){
        callback(rows, fields);
      });
    },

    post: function(msgObj, callback){
      console.log("hello", msgObj);
      console.log("Database Posting User:", msgObj.username);
      this.get(msgObj.username, function(data) {
        console.log("DATAFROM: ", data);
        if (!data[0]) {
          var str = "INSERT into users(user_name) values(?)";
          db.query(str, [msgObj.username], function(err, data) {
            callback(data);
          });
        }else{
          callback();
        }
      })
    }
  }
};

