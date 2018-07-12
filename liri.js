var keys = require("./keys.js");
// require("dotenv").config();
// if (result.error) {
//     throw result.error;
//   }
   
//   console.log(result.parsed);
var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

// var client = new Twitter(JSON.stringify(keys.twitter));
var client = new Twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
  });
// var spotify = new Spotify(keys.spotify);
// console.log('Twit keys: ' + JSON.stringify(keys.twitter));
// // console.log('Keys: ' + keys);
// console.log('Twitter keys: ' + JSON.stringify(client));
//Take in the following arguments:
// * `my-tweets`
var params = {
    screen_name: 'Charlie53987504',
    count: 20
};
var cmdArg = process.argv[2];
var songName = "";
var nodeArgs = process.argv;
if(cmdArg === "my-tweets"){
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            console.log(error);
        } 
        else {
            var data = []; //empty array to hold data
            for (var i = 0; i < tweets.length; i++) {
                data.push({
                    'created at: ': tweets[i].created_at,
                    'Tweets: ': tweets[i].text,
                });
            }
            console.log(data);
            // console.log('Tweets: ' + JSON.stringify(tweets));
            // console.log('Response: ' + JSON.stringify(response));
        }

    });
}

// * `spotify-this-song`
else if(cmdArg === 'spotify-this-song'){
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
      
          songName = songName + "+" + nodeArgs[i];
      
        }
      
        else {
      
          songName += nodeArgs[i];
      
        }
      }
    // for(var i = 3; i < process.argv.length; i++){
    //     songName = process.argv[i];
    
        var spotify = new Spotify({
            id: keys.spotify.id,
            secret: keys.spotify.secret
        });

        spotify
        .search({ type: 'track', query: songName })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(err) {
            console.log(err);
        });
    // }
}
// * `movie-this`

// * `do-what-it-says`