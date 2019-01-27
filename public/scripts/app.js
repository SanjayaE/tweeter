/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
"use strict";
$(document).ready(function() {
$('.new-tweet').hide();
let $tweet;

function timeCal(time) {
  var dateNow = Date.now();
  var seconds = (dateNow - time) / 1000;
  var minutes = (dateNow - time) / 1000 / 60;
  var hours = (dateNow - time) / 1000 / 60 / 60;
  var days = (dateNow - time) / 1000 / 60 / 60 / 24;
  var months = (dateNow - time) / 1000 / 60 / 60 / 24/ 30;
  if (minutes < 1) {
    return `${Math.floor(seconds)} Seconds ago`;
  }else if (minutes > 1 && minutes < 60) {
    return `${Math.floor(minutes)} Minutes ago`;
  }else if (minutes > 60 && hours < 24) {
    return `${Math.floor(hours)} Hours ago`;
  }else if (hours > 24 && days < 30) {
    return `${Math.floor(hours / 24)} Days ago`;
  }else if (days > 30 && months < 12) {
    return `${Math.floor(days / 30)} Months ago`;
  }else{
    return `${Math.floor(months / 12)} Years ago`;
  }
}




function renderTweets(tweets) {

    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container


   for(const data of tweets){
    //this will call the function to create actual tweets
     $tweet = createTweetElement(data);
     //this will append it to all-tweets ID dom structure.
      $('#all-tweets').prepend($tweet);

    }
}

function createTweetElement(tweetobj){

$tweet = $("<article>").addClass("tweet");
const $header = $('<header>');
const $avatars = $('<img>').addClass('profile').attr("src",tweetobj.user.avatars.small);
const $name = $('<h2>').text(tweetobj.user.name);
const $handle = $('<span>').addClass('handle').text(tweetobj.user.handle);
const $body = $('<div>').append($('<p>').text(tweetobj.content.text));
const $footer = $('<footer>');
const $createdAt = $('<span>').addClass('datetime').text(timeCal(tweetobj.created_at));

const $socialLike = $('<img>').addClass('social').attr("src","images/icons8-love-26.png");
const $socialshare = $('<img>').addClass('social').attr("src","images/icons8-twitter-26.png");
const $socialflag = $('<img>').addClass('social').attr("src","images/icons8-flag-filled-26.png");
const $social = $('<span>').append($socialLike,$socialshare,$socialflag);

$($header).append($avatars,$name,$handle);
$($footer).append($createdAt,$social,$footer);
$($tweet).append($header,$body,$footer);

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
    $.post( "/tweets",data,function(){
     $("#tweettex").val("");
     loadTweets();
    } );
  }
  location.reload();

});

/* ******** AJAX to fetch (GET) data from the server****** */

function loadTweets(){
  $.ajax("/tweets", { method: 'GET' })
    .then(function (data) {
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