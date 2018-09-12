var request = require("request");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var moment = require('moment');
moment().format();

//console.log(keys);
// var spotify = new Spotify({
//   id: '07dcf4cd5d054d468b18cf6d15261884',
//   secret: '8c0b294342724320a81115ed8e81bb94'
// });


var nodeArgs = process.argv;
var SearchName = "";
var selection = "";

selection = process.argv[2];

for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    SearchName = SearchName + "+" + nodeArgs[i];
  }

  else {
    SearchName += nodeArgs[i];
  }
}

if (selection == "movie-this"){

  if (SearchName != ""){
    
    var OMDBqueryUrl = "http://www.omdbapi.com/?t=" + SearchName + "&y=&plot=short&apikey=trilogy";

    //console.log(OMDBqueryUrl);
    
    request(OMDBqueryUrl, function(error, response, body) {
    
      if (!error && response.statusCode === 200) {
    
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release year: " + JSON.parse(body).Year);
      console.log("IMDB rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[2].Value);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      }
    });

  }
  else{

    SearchName = "Mr. Nobody";
    var OMDBqueryUrl = "http://www.omdbapi.com/?t=" + SearchName + "&y=&plot=short&apikey=trilogy";

    //console.log(OMDBqueryUrl);
    
    request(OMDBqueryUrl, function(error, response, body) {
    
      if (!error && response.statusCode === 200) {
    
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release year: " + JSON.parse(body).Year);
      console.log("IMDB rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[2].Value);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      }
    });
  }

}

if (selection == "concert-this"){

  console.log("Concert is going to be displayed here");

  var BandsInTownUrl = "https://rest.bandsintown.com/artists/" + SearchName + "/events?app_id=codingbootcamp";
  console.log(BandsInTownUrl);

      request(BandsInTownUrl, function(error, response, body) {
    
      if (!error && response.statusCode === 200) {
    
      //console.log(JSON.parse(body));
      
      var concertList = JSON.parse(body);

     
      // for (var i=0; i<concertList.length; i++){ 

      //   if (concertList[i].venue.name != undefined && concertList[i].venue.city != undefined && concertList[i].venue.country != undefined && concertList[i].datetime != undefined){
      //     console.log("Venue: " + concertList[i].venue.name + "\t Location: "+ concertList[i].venue.city +","+concertList[i].venue.country + "\t Date: " + concertList[i].datetime);
      //   }
      // }
     
      for (var i=0; i<concertList.length; i++){ 

         if (concertList[i].venue.name != undefined && concertList[i].venue.city != undefined && concertList[i].venue.country != undefined && concertList[i].datetime != undefined){
         console.log("Venue: " + concertList[i].venue.name + "\t Location: "+ concertList[i].venue.city +","+concertList[i].venue.country + "\t Date: " + concertList[i].datetime.split("T")[0]);
        }
      }
     



    }
       });
  
}

if (selection == "spotify-this-song"){

  if (SearchName != ""){
    console.log("Song is going to be displayed here");
    spotify.search({ type: 'track', query: SearchName }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      // console.log(data); 
      // console.log(data.tracks.items);
      // console.log(JSON.stringify(data, null, 2)); 
      // var artists;
      // for (var i=0; i<data.tracks.items.length; i++){
      //   if (i==0){
      //     artists = "Artist(s) are: " + data.tracks.items[i].artists[0].name;
      //   }
      //   else{
      //     artists = artists + ", " + data.tracks.items[i].artists[0].name;
      //   }   
      // }
      // console.log(artists);
      for (var i=0; i<data.tracks.items.length; i++){
        console.log("Artist(s): "+ data.tracks.items[i].artists[0].name +" Song's name: " + data.tracks.items[i].name + " Preview link: " + data.tracks.items[i].preview_url + "Album name: " + data.tracks.items[i].album.name);
      }
    });
  }

  else{
    console.log("No song name, here is the result for <The Sign>");
    spotify.search({ type: 'track', query: "The Sign" }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
   
      
      for (var i=0; i<data.tracks.items.length; i++){
        console.log("Artist(s): "+ data.tracks.items[i].artists[0].name +" Song's name: " + data.tracks.items[i].name + " Preview link: " + data.tracks.items[i].preview_url + "Album name: " + data.tracks.items[i].album.name);
      }
    });
  }


  
  
  
}

if (selection == "do-what-it-says"){

  console.log("Reading from random...");
  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }
  
    console.log(data);
  
    var dataArr = data.split(",");
  
    //console.log(dataArr[0]);
    //console.log(dataArr[1]);

    if (dataArr[0] == "movie-this"){

            
        var OMDBqueryUrl = "http://www.omdbapi.com/?t=" + dataArr[1] + "&y=&plot=short&apikey=trilogy";
    
              
        request(OMDBqueryUrl, function(error, response, body) {
        
          if (!error && response.statusCode === 200) {
        
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Release year: " + JSON.parse(body).Year);
          console.log("IMDB rating: " + JSON.parse(body).imdbRating);
          console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[2].Value);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);
          console.log("Actors: " + JSON.parse(body).Actors);
          }
        });
           
    }




  });
  



}
