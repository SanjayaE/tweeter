/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

let $tweet;
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

    console.log(tweets)
   for(let data of tweets){
     $tweet = createTweetElement(data);

      //console.log(data)


      $('#all-tweets').append($tweet);

    }
}

function createTweetElement(tweetobj){

let $tweet = $("<article>").addClass("tweet");
let $name = $('<h2>').text(tweetobj.user.name);
      $tweet.append($name);

let $body = $('<div>').append($('<p>').text(tweetobj.content.text));
$name.append($body)
let $footer = $('<footer>');
$body.append($footer)
let $created_at = $('<span>').addClass('datetime').text(tweetobj.created_at);
$footer.append($created_at)

return $tweet;

}

renderTweets(tweetData);

// let $tweet = createTweetElement(tweetData);


  // Test / driver code (temporary)
//console.log(renderTweets(data)); // to see what it looks like



 // $('all-tweets').append($tweet);


// to add it to the page so we can make sure it's got all the right elements, classes, etc.


});