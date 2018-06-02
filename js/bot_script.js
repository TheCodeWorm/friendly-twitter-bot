var Twit = require('twit');
var T = new Twit({
    consumer_key:         ' ... ',
    consumer_secret:      ' ... ',
    access_token:         ' ... ',
    access_token_secret:  ' ... ',
})

fetch('../credentials.json')
	.then(res => res.json())
	.then(data => {
		var T = new Twit({
    consumer_key:         data.consumer_key,
    consumer_secret:      data.consumer_secret,
    access_token:         data.access_token,
    access_token_secret:  data.access_token_secret
    })
  console.log("testing: ", data.consumer_secret);
})