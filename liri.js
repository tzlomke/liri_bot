// Required Packages
require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var spotifyApi = require("node-spotify-api");
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
            spofityThisSong();
            break;

        case "movie-this":
            movieThis();
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;
    };
}

function concertThis() {
    axios.get("https://rest.bandsintown.com/artists/" + keyword + "/events?app_id=6d9b15f09f67304fbd702249a8b58714")
    .then(function(response) {
        response.data.forEach(gig => {
            var gigData = "Venue: " + gig.venue.name 
                + "\nLocation: " + gig.venue.city
                + "\nDate: " + moment(gig.datetime).format("MM/DD/YYYY")
                + "\n===============================";

            console.log(gigData);
        });
    });
};

function spofityThisSong() {

}

// function movieThis() {

// }

// function doWhatItSays() {

// }

start();