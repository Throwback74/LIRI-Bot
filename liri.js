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
// Create an empty variable for holding the song name
var songName = "";
// Create an empty variable for holding the movie name
var movieName = "";
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
        var spotifyParams = { type: 'track', query: songName };
        if(songName === "") {
            // spotifyParams.query = 'The Sign';
            spotifyParams2 = { type: 'track', query: 'The Sign', offset: 14, market: 'US' };
            // spotifyParams.offset = 14;
            // spotifyParams.market = 'US';
            // Object.assign(spotifyParams, spotifyParams2); 
            // console.log(spotifyParams);
            var spotify = new Spotify({
                id: keys.spotify.id,
                secret: keys.spotify.secret
            });
    
            spotify
            .search(spotifyParams2)
            .then(function(response) {
                // console.log(response);
                var results = response.tracks.items[5];
                console.log(results);
                var songNameFull = results.name;
                var albumName = results.album.name;
                var artistName = results.album.artists[0].name;
                var previewURL = results.preview_url;
                console.log("Track: " + songNameFull + " Album Name: " + albumName + " Artist Name: " + artistName + " Preview Link: " + previewURL);
            })
            .catch(function(err) {
                console.log(err);
            });
        }
        else {
            var spotify = new Spotify({
                id: keys.spotify.id,
                secret: keys.spotify.secret
            });

            spotify
            .search(spotifyParams)
            .then(function(response) {
                // console.log(response);
                var results = response.tracks.items[0];
                // console.log(results);
                var songNameFull = results.name;
                var albumName = results.album.name;
                var artistName = results.album.artists[0].name;
                var previewURL = results.preview_url;
                console.log("Track: " + songNameFull + " Album Name: " + albumName + " Artist Name: " + artistName + " Preview Link: " + previewURL);
            })
            .catch(function(err) {
                console.log(err);
            });
        }
}
// * `movie-this`
else if(cmdArg === 'movie-this'){

    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {

        movieName = movieName + "+" + nodeArgs[i];

    }

    else {

        movieName += nodeArgs[i];

    }
    }

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&r=json&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("Movie Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("RottenTomatoes Rating: " + JSON.stringify(JSON.parse(body).Ratings[1].Value));
        console.log("Country of Origin: " + JSON.parse(body).Country);
        console.log("Movie Language: " + JSON.parse(body).Language);
        console.log("Movie Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
    }
    });
}
// * `do-what-it-says`