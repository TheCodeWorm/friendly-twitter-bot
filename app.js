
const Twitter = require('twitter');
const config = require('./config.js');

let count_likes = 0;
let count_follows = 0;


const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'example.org',
  user     : 'bob',
  password : 'secret'
});
console.log(connection)
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

connection.destroy();


// command line arg passed 
if (!process.argv[2]) {
	addTo();
}

// clean out following list
else if (process.argv[2] === "clean") {
	let next_cursor = -1;
	const getData = function(next_cursor) {
		let T = new Twitter(config);
	  T.get('friends/list', {
	  screen_name: 'The_Code_Worm', cursor: next_cursor
		}, (err, data, response) => {
			let count = 0;
		  if (err) {
		    console.log(err)
		  } 
		  else {
		    //console.log("\n", data)
		    for (let i = 0; i < data.users.length; i++) {
			    console.log(data.users[i].screen_name);
			    //console.log(data.user.following)
		  	}
		  	
				if(next_cursor != 0 && count < 3) { 
					getData(next_cursor = data['next_cursor']);
				}
				count++;
			}
		});
	}
	getData(next_cursor);
}

function addTo() {
	// array for searches
	const searchArr = ['#100daysofcode', '#javascript', '#nodejs', '#301daysofcode', '#30days30sites', '#codenewbie', '#GirlsWhoCode', 'momswhocode' ];

	for (let i = 0; i < searchArr.length; i++) {
		let T = new Twitter(config);

		// Set up your search parameters
		const params = {
		  q: searchArr[i],
		  count: 15,
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
		    	let followers, following;
		    	let followingBool;
		    	let screenName;

          // if a retweet
		      if (data.statuses[i].retweeted_status) { 
		      	followers = data.statuses[i].retweeted_status.user.followers_count;
		      	following = data.statuses[i].retweeted_status.user.friends_count;
		      	followingBool = data.statuses[i].retweeted_status.user.following;
		      	screenName = data.statuses[i].retweeted_status.user.screen_name;
		      	
		      }
		      else {
		      	followers = data.statuses[i].user.followers_count;
		      	following = data.statuses[i].user.friends_count;
		      	followingBool = data.statuses[i].user.following;
		      	screenName = data.statuses[i].user.screen_name;
		      	
		      }

		      if (followingBool === false && following > followers) {
		      	//console.log("created: ", data.statuses[i].retweeted_status.created_at);
		      	console.log("screen_name: ", screenName);
		      	//console.log("description: ", data.statuses[i].retweeted_status.user.description);
		      	//console.log("friends_count: ", data.statuses[i].retweeted_status.user.friends_count);
		      	//console.log("followers_count: ", data.statuses[i].retweeted_status.user.followers_count);
		      	//console.log("following: ", data.statuses[i].retweeted_status.user.following);
	      		//console.log("not follwing and they are following  more people than they have as followers");
	      		
	      		/*
	      		//console.log("Ready to create friendship:");
	      		T.post('friendships/create', {
	      			screen_name: screenName
						}, (err, data, response) => {
							if (err) {
							  console.log("Error: ", err)
							} else {
							  //console.log(data)
							  count_follows++;
							  console.log(count_follows, "follows created!")
							}
						});

	      		//console.log("Ready to Like post:")
						T.post('favorites/create', id, function(err, response) { 
			        // If the favorite fails, log the error message
			        if(err) {
	          		console.log(err[0].message);
	        		}
		        	// If the favorite is successful, log the url of the tweet
			        else {
			          let username = response.user.screen_name;
			          let tweetId = response.id_str;
			          count_likes++;
			          console.log('Favorited: ', count_likes, `https://twitter.com/${username}/status/${tweetId}`)
			        }
	      		});
	      		*/
					}
		    }
		  } 
		});
	}
}


