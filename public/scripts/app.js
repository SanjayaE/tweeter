/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

let $tweet;

//test data
var tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];



function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

   // console.log(tweets)
   for(let data of tweets){
    //this will call the function to create actual tweets
     $tweet = createTweetElement(data);
     //this will append it to all-tweets ID dom structure.
      $('#all-tweets').append($tweet);

    }
}

function createTweetElement(tweetobj){

let $tweet = $("<article>").addClass("tweet");
let $header = $('<header>');
let $avatars = $('<img>').addClass('profile').attr("src", tweetobj.user.avatars.small);
let $name = $('<h2>').text(tweetobj.user.name);
let $handle = $('<span>').addClass('handle').text(tweetobj.user.handle);
let $body = $('<div>').append($('<p>').text(tweetobj.content.text));
let $footer = $('<footer>');
let $createdAt = $('<span>').addClass('datetime').text(tweetobj.created_at);
$($header).append($avatars, $name, $handle);
$($footer).append($createdAt, $footer);
$($tweet).append($header, $body, $footer);

return $tweet;
}

renderTweets(tweetData);

/* *******AJAX POST Request Event handler********* */

//Bind an event handler to the "submit" JavaScript event, or trigger that event on an element.
$('#tweetAjax').on('submit', function(event) {

  //If this method is called, the default action of the event will not be triggered.
  event.preventDefault();
  // turns the form data into a query string.
  //Our server is configure to receive form data formatted as a query string.
  let data = $(this).serialize();

  // This serialized data should be sent to the server in the body field of the AJAX POST request.
  //submit using ajax
  $.post( "/tweets", data, function(){
    console.log(data);
  } );

});

});