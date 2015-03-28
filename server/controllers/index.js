//connected to client
var models = require('../models');
var bluebird = require('bluebird');



module.exports = {
  messages: {
    get: function (req, res) {
      console.log("GET MESSAGE: ",req.url);

      models.messages.get(function(messages) {
        res.writeHead(200);
        res.end("hello");
      });

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log("POST MESSAGE: ",req.body);
      
      var requestBody = '';
      req.on('data', function(data) {
        requestBody += data;  
      });
      req.on('end', function() {
        models.messages.post(JSON.parse(requestBody));
      });
    } // a function which handles posting a message to the database

  },

  users: {
    get: function (req, res) {
      console.log("GET USER: ",req.url);

      models.users.get(function(messages) {
        res.writeHead(200);
        res.end("hello");
      });
    },
    post: function (req, res) {
      console.log("POST USER: ",req.body)
      //var requestBody = '';
      //req.on('data', function(data) {
      //  requestBody += data;  
      //});
      //req.on('end', function() {
      models.users.post(req.body);
      //});
    }
  }
};

