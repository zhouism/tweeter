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
    var $tweet = createTweetElement(tweetData)[0];
    
    console.log($tweet); // to see what it looks like
  
    $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});

const tweetData = {
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
  }
  
  