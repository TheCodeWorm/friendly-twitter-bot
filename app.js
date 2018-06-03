
var Twitter = require('twitter');
var config = require('./config.js');

var T = new Twitter(config);

// Set up your search parameters
var params = {
  q: '#100daysofcode',
  count: 10,
  result_type: 'recent',
  lang: 'en'
}

// Initiate your search using the above paramaters
T.get('search/tweets', params, function(err, data, response) {
  // If there is no error, proceed
  if(!err){
    // Loop through the returned tweets
    for(let i = 0; i < data.statuses.length; i++){

      // Get the tweet Id from the returned data
      let id = { id: data.statuses[i].id_str };
    		
      if (data.statuses[i].retweeted_status) { 
      	console.log("\n");
      	console.log("created: ", data.statuses[i].retweeted_status.created_at);
      	console.log("screen_name: ", data.statuses[i].retweeted_status.user.screen_name);
      	console.log("id: ", data.statuses[i].retweeted_status.user.id);
      	//console.log("description: ", data.statuses[i].retweeted_status.user.description);
      	console.log("followers_count: ", data.statuses[i].retweeted_status.user.followers_count);
      	console.log("friends_count: ", data.statuses[i].retweeted_status.user.friends_count);
    	}
      
      /*
				// follow user
      T.post('friendships/create', id, function(err, response) {
      	if (err) {
      		console.log(err[0].message);
      	}
      	else {
      		let username = response.user.screen_name;
          let tweetId = response.id_str;
          console.log('Followed: ', `https://twitter.com/${username}/status/${tweetId}`)
      	}
    	});

      // like users post
    	T.post('favorites/create', id, function(err, response){
        // If the favorite fails, log the error message
        if(err){
          console.log(err[0].message);
        }
        // If the favorite is successful, log the url of the tweet
        else {
          let username = response.user.screen_name;
          let tweetId = response.id_str;
          console.log('Liked: ', `https://twitter.com/${username}/status/${tweetId}`)
        }
      });
      */
	  }
  } 
  else {
    console.log(err);
  }
})