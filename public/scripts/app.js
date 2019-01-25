/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

let $tweet;


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

// renderTweets(tweetData);

/* *******AJAX POST Request Event handler********* */

//Bind an event handler to the "submit" JavaScript event, or trigger that event on an element.
$('#tweetAjax').on('submit', function(event) {

  //If this method is called, the default action of the event will not be triggered.
  event.preventDefault();
  //check if test input box is empty or has more than 140 chars
  const newTweet = $("#tweettex");
  console.log("tweet:", newTweet.val())
  if (newTweet.val() === "" || newTweet.val() === null) {
    $( "div" ).slideDown( "slow" );
    $(".error").text("Error ! Not a valid input.");
  }else if (newTweet.val().length > 140) {
    $( "div" ).slideDown( "slow" );
    $(".error").text("Error ! Please enter less than 140 characters.");
  }else{
     $( "div" ).hide();

     // turns the form data into a query string.
  //Our server is configure to receive form data formatted as a query string.
    let data = $(this).serialize();

  // This serialized data should be sent to the server in the body field of the AJAX POST request.
  //submit using ajax
    $.post( "/tweets", data, function(){
     // console.log(data);
     renderTweets(data);
  // let $name = $('<h2>').text("demo user");
  // let $body = $('<div>').append($('<p>').text(newTweet.val()));
  // $('#all-tweets').append($name, $body);

    } );
  }
});

/* ******** AJAX to fetch (GET) data from the server****** */

function loadTweets(tweetData){
  $.ajax("/tweets", { method: 'GET' })
    .then(function (data) {
      console.log('Success: ', data);
      renderTweets(data);

    });

}

loadTweets();


//when button press this will toggle the compose tweet section and select textarea

$('.compose').on('click', () => {
$('.new-tweet').slideToggle(250);
$('#tweettex').focus().select();
});




});