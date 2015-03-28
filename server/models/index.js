//connects to the database
var db = require('../db/index.js');



module.exports = {
  messages: {
    get: function (callback) {
      // passes a callback function
      db.getMessages(function(messages) {
        console.log("MESSAGE: ", messages);
        callback(messages);
      });
    }, // a function which produces all the messages
    post: function (data) {

     
      db.getMessages()
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (nameObj, callback) {
      db.addUser(nameObj, function(forgetaboutit) {
        console.log("I did something today");
      });

    }
  }
};

