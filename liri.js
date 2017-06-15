

var action = process.argv[2];

// twitter function
function getTweets(){
// require twitter npm app
var twitter = require('twitter');

var client = new twitter({
  	consumer_key: "zpB5bPK8rpxbWSZFbINXpLQbA",
	consumer_secret: "7RzkLCyU7xHOaj04TjCl3fWrPWjjz0cfIau3VdtJNOibnQrhub",
	access_token_key: "875130421402578944-nsMpaHXBE2hqS49vo3KJuRzfmMcrH32",
	access_token_secret: "y9rc6Wp9WpLhRdhJFm9VGIH5P8ugc07gpprtPWJ9J5zOm",
});
// creating variable to hold scrren name value
var params = {screen_name: 'Jack Sparrow'};
// grabbing data from twitter page
client.get('statuses/user_timeline',{ params, count:20}, function(error, tweets, response) {
  
  if (!error && response.statusCode === 200) {
  	//empty array to hold data
  	var data = [];

  	// loops through tweets
  	for (var i = 0; i < tweets.length; i++) {
  		// pushes data 
  		data.push({
            'created at':tweets[i].created_at,
            'Tweets':tweets[i].text,
        });
      }
      console.log(data);
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







