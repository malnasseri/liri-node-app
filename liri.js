
    //require keys from another file
    var keys = require("./keys.js");
    // require inquirer npm 
    var inquirer = require("inquirer");

    inquirer.prompt([

           {  //creating list of options for user to pick
              type: "list",
              message: "What would you like to do? Please pick one of the following options!!\nPress Enter to continue",
              choices: ["My-Tweets","Spotify-This-Song","Movie-This","Do-What-it-Says"],
              name: "options"
            }
    //inquirer call back function for all the options 
    ]).then(function(user) {

        //when user picks my-tweets it will execute the function
        if(user.options === "My-Tweets") {
        
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
                                  console.log('Tweet: ' + tweets[i].text);
                                  console.log("---------------------------------------------------");
                            }//for loop ends
                        } //if statement checking link ends
                    }); // call back function ends
              }; // getTweets function ends
          }  //if statement for user picking my-tweets from options ends     

          //if user picks spotify 
         else if(user.options === "Spotify-This-Song") { 

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
                                         }//artist name for loop ends here
                                         // printing out song info
                                         console.log("---------------------------------------------------");
                                         console.log('Song Name: ' + songs[i].name);
                                         console.log("---------------------------------------------------");
                                         //added a line so users can copy the url easier from one line
                                         console.log('Preview Song:\n ' + songs[i].preview_url);
                                         console.log("---------------------------------------------------");
                                         console.log('Album: ' + songs[i].album.name);
                                         console.log("---------------------------------------------------");
                                  };//end of for loop
                            });//end of spotify search function
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
                                                  }//artist name for loop ends here

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
         } //end of spotify else if statement 

         // if user picks movie-this
         else if(user.options === "Movie-This") {

                  // prompt for user input
                  inquirer.prompt([
  
                          { //takes a movie name from user input
                          type: "input",
                          message: "Enter a movie name bro: ",
                          name: "movieName"
                          }
                   //inquirer call back function 
                  ]).then(function(user) {
              
                          var request = require('request');

                          if(user.movieName === ""){

                                  var queryUrl = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=40e9cece&tomatoes=true";

                                  request(queryUrl, function(error, response, body) {

                                              // If the request is successful
                                              if (!error && response.statusCode === 200) {

                                                        var movies = response.body;

                                                        console.log("----------------------------------------------------");
                                                        console.log("   Movie Title: " + JSON.parse(movies).Title);
                                                        console.log("----------------------------------------------------");
                                                        console.log("   Year Released: " + JSON.parse(movies).Year);
                                                        console.log("----------------------------------------------------");
                                                        console.log("   imdb Rating: " + JSON.parse(movies).imdbRating);
                                                        console.log("----------------------------------------------------");
                                                        console.log("   Country: " + JSON.parse(movies).Country);
                                                        console.log("----------------------------------------------------");
                                                        console.log("   Language: " + JSON.parse(movies).Language);
                                                        console.log("----------------------------------------------------");
                                                        console.log("   Plot:\n " + JSON.parse(movies).Plot);
                                                        console.log("----------------------------------------------------");
                                                        console.log("   Actors: " + JSON.parse(movies).Actors);
                                                        console.log("----------------------------------------------------");
                                                        console.log("  Rotten Tomatoes URL:\n " + JSON.parse(movies).tomatoURL);
                                                        console.log("----------------------------------------------------");
                        
                                                }//end of if statment 
                                    });
                             }

                            else {

                                    // Then run a request to the OMDB API with the movie specified
                                    var queryUrl = "http://www.omdbapi.com/?t=" + user.movieName + "&y=&plot=short&apikey=40e9cece&tomatoes=true";

                                    request(queryUrl, function(error, response, body) {

                                              // If the request is successful
                                              if (!error && response.statusCode === 200) {

                                                            var movies = response.body;

                                                            console.log("----------------------------------------------------");
                                                            console.log("   Movie Title: " + JSON.parse(movies).Title);
                                                            console.log("----------------------------------------------------");
                                                            console.log("   Year Released: " + JSON.parse(movies).Year);
                                                            console.log("----------------------------------------------------");
                                                            console.log("   imdb Rating: " + JSON.parse(movies).imdbRating);
                                                            console.log("----------------------------------------------------");
                                                            console.log("   Country: " + JSON.parse(movies).Country);
                                                            console.log("----------------------------------------------------");
                                                            console.log("   Language: " + JSON.parse(movies).Language);
                                                            console.log("----------------------------------------------------");
                                                            console.log("   Plot:\n " + JSON.parse(movies).Plot);
                                                            console.log("----------------------------------------------------");
                                                            console.log("   Actors: " + JSON.parse(movies).Actors);
                                                            console.log("----------------------------------------------------");
                                                            console.log("  Rotten Tomatoes URL:\n " + JSON.parse(movies).tomatoURL);
                                                            console.log("----------------------------------------------------");

                                               }//if statement ends
                                    }); // request call back function ends
                              }; // else statement ends
                      });
            }//end of imbd app remember to take the semi colon off before starting what to do app



























        
});// end of inquirer for all the options 