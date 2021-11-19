/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function () {

  //use escape to prevent cross site attacks
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //loops through the data and adds userinput to tweet
  function renderTweets(tweets) {
    $('#tweet-container').empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').prepend($tweet);//adding tweets at the beginning
    }
  }

  /*==================== GENERIC TWEET CREATOR TEMPLATE ===================*/
  function createTweetElement(tweetData) {
    const { user, content, created_at } = tweetData;
    //create variable for outline of new tweets
    const tweetElementHTML = $(`<article class="tweet"> 
  <header>
  <span class="username"><img src="${user.avatars}">${user.name}</span>
  <span class="userHandle">${user.handle}</span>
    </header>
    <div class="tweet-content">
    <p>${escape(content.text)}</p>
    </div>
    <footer>
    <p>${timeago.format(created_at)}</p>
    <div>
        <i class="far fa-flag"></i> 
        <i class="fas fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
        </div>
    </footer>
    </article>`)
    return tweetElementHTML;
  }
  //fetching tweets from page
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(tweets) {
        renderTweets(tweets);
        console.log('Success: ', tweets);
      });
  };
/*======================================= ERROR MESSAGE HANDLING ====================================*/
  const $form = $('form');
  $("#error").hide();
  $form.on('submit', function(event) {
    event.preventDefault();
    $("#error").hide();
    const newTweet = $(this).find("#tweet-text").val();
    if (!newTweet.trim()) {
      $("#error")
        .html("!!! Share something, don't be shy !!!").slideDown();
    }
    if (newTweet.length > 140) {
      $("#error")
        .html("!!! You've got a lot to say, remember only 140 characters !!!").slideDown();
    } else {
      $.ajax("/tweets", {
        method: "post",
        data: $("#post-tweet").serialize(),
        success: () => {
          $("#error").hide();
          $("#tweet-text").val('');
          $(".counter").val(140);
          loadTweets();
        }
      });
    }

  });
  loadTweets();
});



