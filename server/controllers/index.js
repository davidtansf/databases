//connected to client
var models = require('../models');
var bluebird = require('bluebird');



module.exports = {
  messages: {
    get: function (req, res) {
      console.log("GET MESSAGE: ",req.url);

      models.messages.get(function(messages) {
        res.writeHead(200);
        res.end(JSON.stringify({results:messages}));
      });

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log("POST MESSAGE: ",req.body);
      
      models.messages.post(req.body, function(rows, fields){
        console.log("Rows: ", rows, "\nFields: ", fields);
      });
      res.writeHead(204);
      res.end();
    } // a function which handles posting a message to the database
  },

  users: {
    get: function (req, res) {
      console.log("GET USER: ",req.url);

      models.users.get(function(user) {
        console.log("Rows: ", rows, "\nFields: ", fields);
        res.writeHead(200);
        res.end(JSON.stringify(user));
      });
      res.end();
    },
    post: function (req, res) {
      console.log("POST USER: ",req.body)

      models.users.post(req.body, function(rows){
        console.log("Rows: ", rows);
      });
      res.writeHead(204);
      res.end();
    }
  }
};

