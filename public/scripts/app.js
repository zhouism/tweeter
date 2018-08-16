$(document).ready(function() {
    
    //prevents cross-site scripting
    function escape(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    function createTweetElement (tweetObject) {
        $tweet = $("<article>").addClass("tweet");
        let html = `
        <header>
            <img class="profile" src=${tweetObject.user.avatars.small}>
            <h2 class="tweet-head">${tweetObject.user.name}</h2>
            <p class="tweet-handle">${tweetObject.user.handle}</p>
        </header>
            <p class="tweet">
            ${escape(tweetObject.content.text)}
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
      $('#tweets-container').empty();
        for (tweetObject of tweets) {
            let $tweet = createTweetElement(tweetObject);
            $('#tweets-container').prepend($tweet);
        }
      };
    
    
    //Post new tweets with Ajax
    $('form#new-tweet').on('submit', function(postTweet) {
      postTweet.preventDefault();
      let data = $('#tweet-text').val()
      console.log(data)
      //;
      if (data.length <= 0) {       
        errorMessage('Tweet something!');
      }
      else if (data.length > 140) {
        errorMessage('Your Tweet is too long!');
      } else {
        $.post("/tweets", $(this).serialize()).done(function(tweet) {
          errorMessage("");
          $('#tweet-text').val('');
          
          loadTweets();
        });
      }
    })

    //Get new tweets with Ajax
    function loadTweets() {
      $.ajax('/tweets', {method: 'GET' })
      .then(function (tweet) {
        renderTweets(tweet)
      })
    }
    loadTweets();
    //Highlights tweet box on compose button
    $('.compose').click(function(){
      $('#tweet-text').focus();
  });
    
    //Loads error message
    function errorMessage(message) {
      $(".error-message").text(message);
    }
});