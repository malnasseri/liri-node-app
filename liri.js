//require keys from another file
var keys = require("./keys.js");

var action = process.argv[2];
var value = process.argv[3];
// twitter function
function getTweets(){
  // require twitter npm app
  var twitter = require('twitter');

  var twitterKeys = keys.twitterKeys;

  var client = new twitter(twitterKeys);

  // creating variable to hold scrren name value
  var params = {screen_name: 'Jack Sparrow'};
  // grabbing data from twitter page
  client.get('statuses/user_timeline',{ params, count:20}, function(error, tweets, response) {
  
    if (!error && response.statusCode === 200) {


  	   // loops through tweets
  	   for (var i = 0; i < tweets.length; i++) {
  		  

        // This will print out 20 tweets from the account 
        console.log('created at:' + tweets[i].created_at);
        console.log('Tweets: ' + tweets[i].text);


       
      }
      
  	}
   
    
  });

};








// Switch statement to excute different functions
switch (action) {
  // Only excute getTweets function when user enters my-tweets 
  case "my-tweets":
    // calling the function when user enters my-tweets
    getTweets();
    break;


}







