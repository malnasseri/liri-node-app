
    //require keys from another file
    var keys = require("./keys.js");
    // require inquirer npm 
    var inquirer = require("inquirer");

    var colors = require('colors');

    var fs = require('fs');



     function promptUser(){
     inquirer.prompt([

                   {  //creating list of options for user to pick
                      type: "list",
                      message: "What would you like to do? Please pick one of the following options!!\nPress Enter to continue",
                      choices: ["My-Tweets","Spotify-This-Song","Movie-This","Do-What-it-Says", "Exit"],
                      name: "options"
                    }
            //inquirer call back function for all the options 
            ]).then(function(user) {

                    //if user picks My-Tweets it will execute the function
                     if(user.options === "My-Tweets") {
        
                            getTweets();
            
                     }//end of twitter else if statement    

                     //if user picks spotify it will execute the function
                     else if(user.options === "Spotify-This-Song") { 

                            spotifyThisSong();

                     }//end of spotify else if statement 

                     // if user picks movie-this it will execute the function
                     else if(user.options === "Movie-This") {

                            movieThis();
                     }//end of movie else if statement 

                     //if user picks Do-What-it-Says it will execute the function
                     else if(user.options === "Do-What-it-Says") {   

                            doWhatItSays();

                     }//end of Do What else if statement
                     //if user picks exit
                     else if(user.options === "Exit") {   

                            inquirer.prompt.end;

                     };//end of Exit else if statement
                   
        });// end of inquirer for all the options 
};// end of promptUser function

            promptUser();

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
                                  console.log('created at: '.bold + tweets[i].created_at.bold);
                                  console.log('Tweet: '.bold + tweets[i].text.red.bold);
                                  console.log("---------------------------------------------------");
                            }//for loop ends
                        } //if statement checking link ends
                        promptUser();
                    }); // call back function ends
              }; // getTweets function ends

              //creationg functions that handles spotify
              function spotifyThisSong(){

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
                                                                   console.log('Artist(s): '.bold + songs[i].artists[j].name.red.bold);
                                                           }//artist name for loop ends here
                                                           // printing out song info
                                                           console.log("---------------------------------------------------");
                                                           console.log('Song Name: '.bold + songs[i].name.red.bold);
                                                           console.log("---------------------------------------------------");
                                                           //added a line so users can copy the url easier from one line
                                                           console.log('Preview Song:\n '.bold + songs[i].preview_url.blue);
                                                           console.log("---------------------------------------------------");
                                                           console.log('Album: '.bold + songs[i].album.name.red.bold);
                                                           console.log("---------------------------------------------------");
                                                 };//end of for loop
                                                  promptUser();
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
                                                         
                                                         console.log('Artist(s): '.bold + songs[i].artists[j].name.red.bold);
                                                  }//artist name for loop ends here

                                                  // printing song's info
                                                  console.log("---------------------------------------------------");
                                                  console.log('Song Name: '.bold + songs[i].name.red.bold);
                                                  console.log("---------------------------------------------------");
                                                  //added a line so users can copy the url easier from one line 
                                                  console.log('Preview Song:\n '.bold + songs[i].preview_url.blue);
                                                  console.log("---------------------------------------------------");
                                                  console.log('Album: '.bold + songs[i].album.name.red.bold);
                                                  console.log("---------------------------------------------------");

                                      };//end of for loop
                                      promptUser();
                              });//end of spotify search

                        };//end of else statement 

                        }); //end of inquirer call back function
                               
              };// end of spotifyThisSong function



              //creating function that handles movie search
              function movieThis(){

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
                                                        console.log("   Movie Title: ".bold + JSON.parse(movies).Title.red.bold);
                                                        console.log("----------------------------------------------------");
                                                        console.log("   Year Released: ".bold + JSON.parse(movies).Year.red.bold);
                                                        console.log("----------------------------------------------------");
                                                        console.log("   imdb Rating: ".bold + JSON.parse(movies).imdbRating.red.bold);
                                                        console.log("----------------------------------------------------");
                                                        console.log("   Country: ".bold + JSON.parse(movies).Country.red.bold);
                                                        console.log("----------------------------------------------------");
                                                        console.log("   Language: ".bold + JSON.parse(movies).Language.red.bold);
                                                        console.log("----------------------------------------------------");
                                                        console.log("   Plot:\n ".bold + JSON.parse(movies).Plot.red);
                                                        console.log("----------------------------------------------------");
                                                        console.log("   Actors: ".bold + JSON.parse(movies).Actors.red.bold);
                                                        console.log("----------------------------------------------------");
                                                        console.log("  Rotten Tomatoes URL:\n ".bold + JSON.parse(movies).tomatoURL.blue);
                                                        console.log("----------------------------------------------------");
                        
                                                }//end of if statment 
                                                promptUser();
                                    });// request call back function ends here
                             }// if statement ends here

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
                                               promptUser();
                                    }); // request call back function ends
                              }; // else statement ends
                      });//inquirer input function ends here
              };// movieThis function ends here


              function doWhatItSays() {

                         
                         fs.readFile("random.txt", "utf8", function(error, data) {       
                                var dataArr = data.split(',');
                                if(dataArr[0] === "Spotify-This-Song"){

                                              // require spotify npm
                                              var Spotify = require('node-spotify-api');
                                              // adding id and secret
                                              var spotify = new Spotify({
                                                id: "15327b32486a4fda88a3e9ec70fa7c1e",
                                                secret: "5cbd33ae0f4e4083bd14097df393323a"
                                              });
                                              spotify.search({ type: 'track', query:dataArr[1], limit:1 }, function(err, data) {
                                                 var songs = data.tracks.items;
                                                        // for loop to get song's info
                                                        for (var i = 0; i < songs.length; i++) {
                                                                  //for loop to get artist's name
                                                                   for(var j =0; j < songs[i].artists.length; j++){
                                                                            //printing Artist name
                                                                           console.log("---------------------------------------------------");
                                                                           console.log('Artist(s): '.bold + songs[i].artists[j].name.red.bold);
                                                                   }//artist name for loop ends here
                                                                   // printing out song info
                                                                   console.log("---------------------------------------------------");
                                                                   console.log('Song Name: '.bold + songs[i].name.red.bold);
                                                                   console.log("---------------------------------------------------");
                                                                   //added a line so users can copy the url easier from one line
                                                                   console.log('Preview Song:\n '.bold + songs[i].preview_url.blue);
                                                                   console.log("---------------------------------------------------");
                                                                   console.log('Album: '.bold + songs[i].album.name.red.bold);
                                                                   console.log("---------------------------------------------------");
                                                         };//end of for loop
                                                         promptUser(); 
                                                });//end of spotify search function
                                }//end of if statement 
                             });//end of readFile call back function
               };//end of DoWhatItSays function
