

var Twit = require('twit');

// replace ... with consumer/access keys
var T = new Twit({
    consumer_key:         ' ... ',
    consumer_secret:      ' ... ',
    access_token:         ' ... ',
    access_token_secret:  ' ... ',
})

// replace ... with user IDs of users to retweet
var users = [" ... ", " ... ", " ... "];

// create stream
var stream = T.stream('statuses/filter', {follow: users});

// listen on stream for tweets
stream.on('tweet', function (tweet) {
    if (users.indexOf(tweet.user.id_str) > -1) {
        console.log(tweet.user.name + ": " + tweet.text);
        T.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
            console.log(data)
        })
    }
})
