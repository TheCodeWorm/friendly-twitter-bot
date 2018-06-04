
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
    	console.log("\nIteration "+i+1+": ")

    	let id = { id: data.statuses[i].id_str };
    	// if valid status
      if (data.statuses[i].retweeted_status) { 
      	// Get the tweet Id from the returned data
      	
      	let followers = data.statuses[i].retweeted_status.user.followers_count;
      	let following = data.statuses[i].retweeted_status.user.friends_count;
      	let followingBool = data.statuses[i].retweeted_status.user.following;

      	if (followingBool === false && following > followers) {
	      	console.log("created: ", data.statuses[i].retweeted_status.created_at);
	      	let screenName = data.statuses[i].retweeted_status.user.screen_name;
	      	console.log("screen_name: ", screenName);
	      	console.log("id: ", data.statuses[i].retweeted_status.user.id);
	      	//console.log("description: ", data.statuses[i].retweeted_status.user.description);
	      	console.log("friends_count: ", data.statuses[i].retweeted_status.user.friends_count);
	      	console.log("followers_count: ", data.statuses[i].retweeted_status.user.followers_count);
	      	console.log("following: ", data.statuses[i].retweeted_status.user.following);
      		console.log("not follwing and they are following  more people than they have as followers");

      		console.log("Ready to create friendship:");
      		T.post('friendships/create', {
      			screen_name: screenName
					}, (err, data, response) => {
						if (err) {
						  console.log("Error: ", err)
						} else {
						  //console.log(data)
						  console.log("follow created!")
						}
					});

      		console.log("Ready to Like post:")
					T.post('favorites/create', {
					  id: id
					}, (err, data, response) => {
					  if (err) {
					    console.log("Error: ", err)
					  } else {
					    //console.log(`${data.text} tweet liked!`)
					    console.log("tweet liked!")
					  }
					});

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
      	else { 
    			console.log("did not fit requirements");
    		}
    	}
    	else {
    		console.log("There is no.. data.statuses[i].retweeted_status")
    	}
	  }
  } 
  else {
    console.log(err);
  }
})