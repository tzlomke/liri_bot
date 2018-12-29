// Required Packages
require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var keys = require("./keys");

// Spotify Keys
var spotify = new Spotify(keys.spotify);

// Command Line Arguments
var command = process.argv[2];
var keyword = process.argv.slice(3).join(" ");

// Switch Statements
// Does this need to be wrapped in a start function???
function start() {
    switch (command) {
        case "concert-this":
            concertThis();
            break;
        
        case "spotify-this-song":
            spotifyThisSong();
            break;

        case "movie-this":
            movieThis();
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;
    };
}

// Bandsintown Search
function concertThis() {
    axios.get("https://rest.bandsintown.com/artists/" + keyword + "/events?app_id=6d9b15f09f67304fbd702249a8b58714")
    .then(function(response) {
        if (response.data.length === 0) {
            console.log("\nNo tour dates scheduled.");
        } else {
            for (var i = 0; i < response.data.length; i++) {
                var showData = "\nVenue: " + response.data[i].venue.name +
                    "\nLocation: " + response.data[i].venue.city +
                    "\nDate: " + moment(response.data[i].datetime).format("MM/DD/YYYY") +
                    "\n=====================================";

                console.log(showData);
            };
        };
    });
};

// Spotify Search
function spotifyThisSong() {
    if (keyword === "") {
        keyword = "The Sign Ace of Base"
    };

    spotify.search({ type: "track", query: keyword }, function(err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }

        for (var i = 0; i < data.tracks.items.length; i++) {
            var songData = "\nArtist: " + data.tracks.items[i].artists[0].name
                + "\nTrack: " + data.tracks.items[i].name
                + "\nAlbum: " + data.tracks.items[i].album.name
                + "\nPreview URL: " + data.tracks.items[i].preview_url
                + "\n=====================================";

            console.log(songData);
        };
    });
};

function movieThis() {
    if (keyword === "") {
        keyword = "Mr. Nobody";
    };

    axios.get("http://www.omdbapi.com/?t=" + keyword + "=&plot=short&apikey=trilogy")
    .then(function(response) {   
        var movieData = "\nTitle: " + response.data.Title
            + "\nRelease Year: " + response.data.Year
            + "\nIMDB Rating: " + response.data.imdbRating
            + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value
            + "\nCountry: " + response.data.Country
            + "\nLanguage: " + response.data.Language
            + "\nPlot Summary: " + response.data.Plot
            + "\nActors: " + response.data.Actors
            + "\n=====================================";

        console.log(movieData);
    });
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        };
      
        dataArr = data.split(",");

        command = dataArr[0];
        keyword = dataArr[1];

        start();
      });
};

start();