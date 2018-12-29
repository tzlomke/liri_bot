// Required Packages
require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var spotifyApi = require("node-spofity-api");
var fs = require("fs");
var keys = require("keys.js");

// Spotify Keys
var spotify = new Spotify(keys.spotify);

// Command Line Arguments
var command = process.argv[2];
var keyword = process.argv.slice(3).join(" ");