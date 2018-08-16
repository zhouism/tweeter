/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
    function createTweetElement (tweetObject) {
        $tweet = $("<article>").addClass("tweet");
        let html = `
        <header>
            <img class="profile" src=${tweetObject.user.avatars.small}>
            <h2 class="tweet-head">${tweetObject.user.name}</h2>
            <p class="tweet-handle">${tweetObject.user.handle}</p>
        </header>
            <p class="tweet">
            ${tweetObject.content.text}
            </p>
        <footer>
            <p class= "timer">${tweetObject.created_at}</p>
            <div class="icons">
                <i class="fas fa-flag"></i>
                <i class="fas fa-heart"></i>
                <i class="fas fa-retweet"></i>
            </div>
        </footer>
        `;
        return $tweet.append(html);
    }
    
    function renderTweets(tweets) {
        for (tweetObject of tweets) {
            let $tweet = createTweetElement(tweetObject);
            $('#tweets-container').append($tweet);
        }
      };
    
    
    //Post new tweets with Ajax
    $('form#new-tweet').on('submit', function(postTweet) {
      postTweet.preventDefault();
      let data = $(this).serialize();
      if (data.length <= 5) {
        alert('Tweet something!');
      }
      if (data.length > 145) {
        alert('Your Tweet is too long!');
      } else {
        $.post("/tweets", data).done(function(tweet) {
          loadTweets();
        });
      }
    })

    //Get new tweets with Ajax
    function loadTweets(tweet) {
      $.ajax('/tweets', {method: 'GET' })
      .then(function (tweet) {
        renderTweets(tweet)
      })
    }
    
});