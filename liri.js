//require keys from another file
var keys = require("./keys.js");

// require inquirer npm 
var inquirer = require("inquirer");

inquirer.prompt([


 {  //creating list of options for user to pick
    type: "list",
    message: "What would you like to do? Please pick one of the following options!!\nPress Enter to continue",
    choices: ["my-tweets","spotify-this-song"],
    name: "options"
  }
    //inquirer call back function
  ]).then(function(user) {
    //when user picks my-tweets it will execute the function
    if(user.options === "my-tweets") {
        
        getTweets();
      // function to grab tweets
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

            console.log("---------------------------------------------------");
            console.log('created at: ' + tweets[i].created_at);
            console.log('Tweets: ' + tweets[i].text);
            console.log("---------------------------------------------------");
          }//for loop ends
      } //if statement checking link ends
    }); // call back function ends
  }; // getTweets function ends
 }  //if statement for user picking my-tweets from options ends     


      //if user picks spotify 
    else if(user.options === "spotify-this-song") { 

        inquirer.prompt([
  
            { //takes a song name from user input
            type: "input",
            message: "Enter a song name bro: ",
            name: "songName"
            }
         //inquirer call back function 
        ]).then(function(user) {
              // require spotify npm
              var Spotify = require('node-spotify-api');
              // adding id and secret
              var spotify = new Spotify({
              id: "15327b32486a4fda88a3e9ec70fa7c1e",
              secret: "5cbd33ae0f4e4083bd14097df393323a"
              });

              if(user.songName === ""){

                 //spotify search function for the sign
                spotify.search({
                type: 'track',
                query: 'ace+of+base+sign' + '&limit=1&'
             }, function(error, data) {
                if (error) {
                    console.log('Error occurred: ' + error);
                    return;
                }
                var songs = data.tracks.items;
                // for loop to get song's info
                for (var i = 0; i < songs.length; i++) {

                  //for loop to get artist's name
                   for(var j =0; j < songs[i].artists.length; j++){
                      //printing Artist name
                     console.log("---------------------------------------------------");
                     console.log('Artist(s): ' + songs[i].artists[j].name);
                }
                // DO SOMETHING WITH 'data'
                console.log("---------------------------------------------------");
                console.log('Song Name: ' + songs[i].name);
                console.log("---------------------------------------------------");
                //added a line so users can copy the url easier from one line
                console.log('Preview Song:\n ' + songs[i].preview_url);
                console.log("---------------------------------------------------");
                console.log('Album: ' + songs[i].album.name);
                console.log("---------------------------------------------------");
                };//end of for loop
            });//end of spotify search
          


              }//end of if statement

            else {
               //spotify search function
                  spotify.search({ type: 'track', query:user.songName, limit:1 }, function(err, data) {
  
                    if (err) {
                      return console.log('Error occurred: ' + err);
                    }//end of err

                    var songs = data.tracks.items;
           

                    for (var i = 0; i < songs.length; i++) {
                       //for loop to get artist's name
                   for(var j =0; j < songs[i].artists.length; j++){

                      //printing Artist name
                     console.log("---------------------------------------------------");
                     console.log('Artist(s): ' + songs[i].artists[j].name);
                }
                      // printing song's info
                    console.log("---------------------------------------------------");
                    console.log('Song Name: ' + songs[i].name);
                    console.log("---------------------------------------------------");
                    //added a line so users can copy the url easier from one line 
                    console.log('Preview Song:\n ' + songs[i].preview_url);
                    console.log("---------------------------------------------------");
                    console.log('Album: ' + songs[i].album.name);
                    console.log("---------------------------------------------------");

                    };//end of for loop

                  });//end of spotify search 
              };//end of else statement 

            }); //end of inquirer call back function
      }; //end of spotify else if statement 

   





        //here will be omdb function












});







