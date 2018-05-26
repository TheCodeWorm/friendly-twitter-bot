var Twit = require('twit')
var T = new Twit({
    consumer_key:         ' ... ',
    consumer_secret:      ' ... ',
    access_token:         ' ... ',
    access_token_secret:  ' ... ',
})

var users = [" ... ", " ... ", " ... "];

var stream = T.stream('statuses/filter', {follow: users});
