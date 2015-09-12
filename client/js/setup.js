
//-------------- BEGIN VARIABLE/FUNCTION DECLARATIONS ---------------------

//This one calls the Parse server to grab data, and sends it to processData
var getData = function() {
  $.ajax('http://127.0.0.1:3000/classes/messages', {
    contentType: 'application/json',
    type: 'GET',
    success: function(data){
      processData(JSON.parse(data));
    },
    error: function(data) {
      $('#error').prepend(' oh no').append('!');
    }
  });
}

// Here we sort the server messages by 'Created at' and send them to displayData
var processData = function(data) {
  if(data.results){
    var sortedData = data.results.sort(function(a,b) {
      var aDate = new Date(a.createdAt);
      var bDate = new Date(b.createdAt);
      if (aDate > bDate) {
          return -1;
      } else if (aDate === bDate) {
          return 0;
      } else {
          return 1;
      }
    });
    displayData({'results' : sortedData}, userSelected);
  }
}

var checkNewData = function(data) {
  var compDate = newestDate;
  var newDate = new Date(data.results[0].createdAt);
  if (newDate > compDate) {
    return true;
  } else {
    return false;
  }
}

var userSelectedGroup = {},
    newestDate = new Date(),
    userSelected;

var displayData = function(data, user) {
  var $results = [];
  var resultCount = 0;

  // if(checkNewData(data)) {
  //   return;
  // }

  var i = 0;
  while(resultCount < 10 && i < data.results.length) {
    //eval(data.results[i].hax);
    newestDate = new Date(data.results[0].createdAt);

    if(user === data.results[i].username || !user) {
      console.log(data.results[i]);
      var timestamp  = moment(data.results[i].createdAt).format('h:mm:ss a'),
        $result      = $('<li></li>').attr('data-username', data.results[i].user_name),
        $message     = $('<p></p>').text(data.results[i].message),
        $userName    = $('<a></a>').text(data.results[i].user_name).addClass("onlyUser"),
        $likeUser    = $('<a></a>').addClass("addUser").text(': '),
        $timeStamp   = $('<span></span>').text(timestamp);

        if (userSelectedGroup[data.results[i].username]) {
          $message.addClass('highlight')
        }

        $result.html([$userName, $timeStamp, $likeUser, $message]);
        $results.push($result)
        resultCount++;
      }
    i++;
  }

  $('#main').find('ul').html($results);
  $(".onlyUser").on('click', function() {
    if(userSelected !== $(this).closest('li').data("username")) {
      userSelected = $(this).closest('li').data("username");
      $('#backButton').toggle();
      if (!userSelected) {
        $('.title').text('Chat with JSON');
      } else {
        $('.title').text(userSelected);
      };
      getData();
    }
  });
  $(".addUser").on('click',function() {
    if(userSelectedGroup[$(this).closest('li').data('username')]) {
      delete userSelectedGroup[$(this).closest('li').data('username')];
    } else {
      userSelectedGroup[$(this).closest('li').data('username')] = true;
    }
    getData();
  });


}

var postData = function(message, username) {
  $.ajax({
      url: 'http://127.0.0.1:3000/classes/messages',
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify({
              'username' : username,
              'message': message
              }),
      success: function(data){
        console.log("Success!", data);
        //send a get request whenever the user posts to refresh the posts
        getData();
      },
      error: function(data){
        console.log(data);
      }
  });
};

//-------------- END VARIABLE/FUNCTION DECLARATIONS ---------------------

getData();

//update mechanism
setInterval(getData, 7000);


$(".submit").on('submit',function(event) {
  event.preventDefault();
  var username = $(".usernameInput").val();
  $('#backButton').toggle();
  $('.title').text('Chat with JSON');

  postData($(".userInput").val(), username);

  //clear out the user input after sending data
  $(".userInput").val("");
  $(".usernameInput").val("");
});

$(".refresh").on('click',function(event) {
  event.preventDefault();
  console.log(event);
});
