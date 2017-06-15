

var action = process.argv[2];
function getTweets(){

var twitter = require('twitter');
var client = new twitter({
  	consumer_key: "zpB5bPK8rpxbWSZFbINXpLQbA",
	consumer_secret: "7RzkLCyU7xHOaj04TjCl3fWrPWjjz0cfIau3VdtJNOibnQrhub",
	access_token_key: "875130421402578944-nsMpaHXBE2hqS49vo3KJuRzfmMcrH32",
	access_token_secret: "y9rc6Wp9WpLhRdhJFm9VGIH5P8ugc07gpprtPWJ9J5zOm",
});
var params = {screen_name: 'Jack Sparrow'};

client.get('statuses/user_timeline',{ params, count:20}, function(error, tweets, response) {
  
  if (!error) {

  	var data = [];


  	for (var i = 0; i < tweets.length; i++) {
  		
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
getTweets();
break;


}







