

var Twitter = require('twitter');
 
var client = new Twitter({
  	consumer_key: "zpB5bPK8rpxbWSZFbINXpLQbA",
	consumer_secret: "7RzkLCyU7xHOaj04TjCl3fWrPWjjz0cfIau3VdtJNOibnQrhub",
	access_token_key: "875130421402578944-nsMpaHXBE2hqS49vo3KJuRzfmMcrH32",
	access_token_secret: "y9rc6Wp9WpLhRdhJFm9VGIH5P8ugc07gpprtPWJ9J5zOm",
});
var params = {screen_name: 'Jack Sparrow'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
    
  }
});
