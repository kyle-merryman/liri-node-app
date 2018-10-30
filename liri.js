
//packages required are listed here
require("dotenv").config();
require("keys.js");

//You should then be able to access your keys information like so
var spotify = new Spotify(keys.spotify); //ERROR - CANNOT READ DESPITE COPY/PASTE FROM ASSIGNMENT
var OMDB = new OMDB(keys.omdb);
var bands = new Bands(keys.bands);

//STARTS the whole app
function init(){
    listener(); //ERROR - NOT COUNTED AS FUNCTION

//START
    init();

//listens whether user specifies Spotify, Bands-in-Town, or OMDB
var listener = function(){
    var searchType = process.argv[2];
    if (searchType == "concert-this") {
        bandsSearch(process.argv[3]);
    } else if (searchType == "spotify-this-song") {
        spotSearch(process.argv[3]);
    } else if (searchType == "movie-this") {
        omdbSearch(process.argv[3]);
    } else if (searchType == "do-what-it-says") {
        return;
    } else {
        console.log("__________________________________________");
        console.log("Please complete your search and try again.");
        console.log("__________________________________________");
    }
}

//searches based on searchType from listener();
/////////////////////////////
//for SPOTIFY
var spotSearch = function(q){
    song = q;
    var queryURL = "https://api.spotify.com/v1/" + song + spotify;
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response);
          spotResponse();
    });
}
//for BANDS
var bandsSearch = function(q){
    artist = q;
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            bandsResponse();
    });
}
//for OMDB
var omdbSearch = function(q){
    movie = q;
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response);
          omdbResponse();
  });
}
/////////////////////////////
//NOTE: can't create ONE func. for all API calls b/c too specific


//functions with responses from API
///////////////////////////////////
//for SPOTIFY
var spotResponse = function(){
    //Artist(s)
    var artist = "";
    //The song's name
    var song_name = "";
    //A preview link of the song from Spotify
    var preview = "";
    //The album that the song is from
    var album = "";
    //MESSAGE IN CONSOLE
    console.log("__________________________________________");
    console.log(song_name + " was performed by " + artist);
    console.log("It debuted on the album " + album);
    console.log("Link to preview: " + preview);
    console.log("__________________________________________");

}
//for BANDS
var bandsResponse = function(){
    //name of venue
    var venueName = response.VenueData.properties.name;
    //venue location
    var city = response.VenueData.properties.city;
    var region = response.VenueData.properties.region;
    var country = response.VenueData.properties.country;
    //date of event
    var dateRAW = response.EventData.properties.datetime;
    var date = moment(dateRAW).format("MM/DD/YYYY");

    //MESSAGE IN CONSOLE2
    console.log("__________________________________________");
    console.log("Venue Name: " + venueName);
    console.log("Location: " + city + " " + region + ", " + country);
    console.log("Date: " + date);
    console.log("__________________________________________");
}
//for OMDB
var omdbResponse = function(){
    //title
        var title = response.Title;
    //year
        var year = response.Year;
    //rotten tomatoes
        var tomatoes = tomatoRating;
    //country
        var country = response.Country;
    //language
        var language = response.Language;
    //plot
        var plot = response.Plot;
    //actors
        var actors = response.Actors;

    //MESSAGE IN CONSOLE
    console.log("__________________________________________");
    console.log(title + " came out in " + year);
    console.log("It starred " + actors);
    console.log(title + " is available in " + language);
    console.log(title + " was produced in " + country + ", and received a " + tomatoes + " rotten tomatoes rating");
    console.log("The Plot:");
    console.log(plot);
    console.log("__________________________________________");

}
