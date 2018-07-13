var keys = require("./keys.js");

var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


var client = new Twitter(keys.twitter);
// var spotify = new Spotify(keys.spotify);

var params = {
    screen_name: 'Charlie53987504',
    count: 20
};
var cmdArg = process.argv[2];
// Create an empty variable for holding the song name
var songName = "";
// Create an empty variable for holding the movie name
var movieName = "";
var divider =
"\n------------------------------------------------------------\n\n";
var nodeArgs = process.argv;

var queryLine = "";
for (var i = 3; i < nodeArgs.length; i++) {

if (i > 3 && i < nodeArgs.length) {

    queryLine = queryLine + "+" + nodeArgs[i];

} else {

    queryLine += nodeArgs[i];

}
    
}

if (cmdArg === "my-tweets") {
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            console.log(error);
        } else {
            
            var tweetData = []; //empty array to hold tweetData
            for (var i = 0; i < tweets.length; i++) {
                tweetData.push({
                    'created at: ': tweets[i].created_at,
                    'Tweets: ': tweets[i].text,
                });
            }
            
            tweetData.join("\n\n");
            console.log(tweetData);
        fs.appendFile("log.txt", cmdArg + "\n\n " + JSON.stringify(tweetData) + divider, function(err) {
            if (err) throw err;
            console.log("Most Recent Tweets: " + JSON.stringify(tweetData));
        });
            
        }

    });
}

// * `spotify-this-song`
else if (cmdArg === 'spotify-this-song') {
    
    songName = queryLine;
    
    var spotifyParams = {
        type: 'track',
        query: songName
    };
    getSpotifyTracks(spotifyParams);
}
// * `movie-this`
else if (cmdArg === 'movie-this') {
    
    movieName = queryLine;
    getMovieInfo(movieName);

}
// * `do-what-it-says`
else if(cmdArg === 'do-what-it-says'){
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
        return console.log(error);
        }
    
        // We will then print the contents of data
        console.log(data);
    
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
    
        // We will then re-display the content as an array.
        console.log(dataArr);
        cmdArg = dataArr[0];
        songName = dataArr[1];

        var randomParams = {
            type: 'track',
            query: songName
        };
        
        getSpotifyTracks(randomParams);
    });
}
else {
    getMovieInfo("Star Wars");
}
function getSpotifyTracks(spotParams) {
    
    if(!spotParams.query) {
        spotifyParams2 = {
            type: 'track',
            query: 'The Sign',
            offset: 14,
            market: 'US'
        };
    } else {
        spotifyParams2 = spotParams;
    }
    

    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    spotify
        .search(spotifyParams2)
        .then(function (response) {
            
            var results = response.tracks.items[5];
            
            var songNameFull = results.name;
            var albumName = results.album.name;
            var artistName = results.album.artists[0].name;
            var previewURL = results.preview_url;
            
            var spotifyInfo = [
                "Track: " + songNameFull,
                " Album Name: " + albumName,
                " Artist Name: " + artistName,
                " Preview Link: " + previewURL
            ].join("\n\n");
            // console.log(spotifyInfo);
        fs.appendFile("log.txt", cmdArg + "\n\n " + spotifyInfo + divider, function(err) {
            if (err) throw err;
            console.log(spotifyInfo);
        });
        })
        .catch(function (err) {
            console.log(err);
        });
}
    function getMovieInfo(movieParam) {
        
        if(!movieParam) {
            movieName = "Mr. Nobody";
        } else {
            movieName = movieParam;
        }
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&r=json&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover each item, storing it in a variable
            var movieData = JSON.parse(body);
            var movieTitle = movieData.Title;
            var movieYear = movieData.Year;
            var movieImdbRating = movieData.imdbRating;
            var tomatoesRating = JSON.stringify(movieData.Ratings[1].Value);
            var movieCountry = movieData.Country;
            var movieLanguage = movieData.Language;
            var moviePlot = movieData.Plot;
            var movieActors = movieData.Actors;
            
            var movieInfo = [
            "Movie Title: " + movieTitle,
            "Release Year: " + movieYear,
            "IMDB Rating: " + movieImdbRating,
            "RottenTomatoes Rating: " + tomatoesRating,
            "Country of Origin: " + movieCountry,
            "Movie Language: " + movieLanguage,
            "Movie Plot: " + moviePlot,
            "Actors: " + movieActors
                ].join("\n\n");
                
            fs.appendFile("log.txt", cmdArg + "\n\n " + movieInfo + divider, function(err) {
                if (err) throw err;
                console.log(movieInfo);
            });
        }
    });
    }