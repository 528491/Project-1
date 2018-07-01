# North Hollywood Church

## Overview
Web-site for a North-Hollywood based Church with Bootstrap CSS for styling; makes use of the Facebook Graph, Google Maps Directions, and YouTube APIs. Also features Firebase authentication with both federated resource providers and direct sign in with email and password.


## Technologies Used
- Html, CSS
- Bootstrap
- Javascript
- Jquery
- Facebook API
- Google API
- Responsive design
- Firebase

## Code Explanation
### Styling
Styling was achieved via the Bootstrap CSS framework, with custom CSS added as needed.
JQuery was also utilized, primarily for ease of readability with regards to the JavaScript code.

### Functionality
In addition, the following services were utilized, accessed via the JavaScript API.

#### Facebook Graph API
In order to use Facebook Graph API, we need to use developers.facebook.com to create App ID and App Secret for our application. We use App ID and App Secret to get access token for our application. For each query on Facebook Graph API we need to add access token in order to get authenticated. 

Some fields required additional review by Facebook in order to be approved for usage in live applications. Right now, we cannot submit review request since Facebook is reviewing its policies. Future political climates might allow for the integration of these features as planned.

#### Google Maps Directions API
Display travel directions on map and detail turn by turn to user. We added AutoComplete address to the input box. Map will look for addresses as user typing in. User can pick an address from the suggested list. 

```javascript
//Global Variables
var placeSearch, autocomplete, marker;

function init () {
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var directionsService = new google.maps.DirectionsService;
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: 34.251268, lng: -118.441183}
      });
      directionsDisplay.setMap(map);

      //Details Button click
      document.getElementById('detailsBtn').addEventListener('click', function () {
          //Display detail panel
          directionsDisplay.setPanel(document.getElementById('bottom-panel'));
          var control = document.getElementById('floating-panel');
          control.style.display = 'block';
          map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
      });
      
      //Event Listener to change on start location and travel mode
      var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
      };
      //Invoke function calculateAndDisplayRoute on change of location and travel mode
      document.getElementById('start').addEventListener('change', onChangeHandler);
      document.getElementById('mode').addEventListener('change', onChangeHandler);
      
      // Create the autocomplete object, restricting the search to geographical
      // location types.
      autocomplete = new google.maps.places.Autocomplete(
              /** @type {!HTMLInputElement} */(document.getElementById('start')),
          { types: ['geocode'] });

      //Added Marker code
      marker = new google.maps.Marker({
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: { lat: 34.251268, lng: -118.441183 },
            title: 'Vietnamese Evangelical Church (Hội Thánh Tin Lành Việt Nam) North Hollywood'
          });
          marker.addListener('click', toggleBounce);
        
        //Marker bounces on mouse click
        function toggleBounce() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } 
          else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
        }//End of marker code
}//end of init function



// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}//end of geolocate()

//calculate and display route base on travel mode
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    //Travel Mode value
    var selectedMode = document.getElementById('mode').value;
    //Start location value input
    var start = document.getElementById('start').value;
    //Assigned end location
    var end = "9936 Beachy Ave. Arleta, CA 91331";

    directionsService.route({
      origin: start, 
      destination: end,
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode[selectedMode]
    }, function(response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
      } 
      else {
        return;
      }
    });
  }//end of function calculateAndDisplayRoute
```

#### YouTube API
The displaying of the client’s YouTube videos was accomplished via two HTTP GET requests. The first request retrieved the YouTube ID of the client’s channel uploads, and the second request used this ID to display thumbnails of the channel’s videos and an iframe element to the page. The following is an example of these two GET requests, with each request being part of a function. Note that the second GET request is inside the first, and that an additional function is needed to attach click events to the displayed thumbnails.

```javascript
var channelName = "ChurchNorthHollywood";

var channelInfo = {
   part: 'contentDetails',
   forUsername: channelName,
   key: 'AIzaSyCqxm1KaFeRuiGu1vl6YcaDnmg7mU0mU_4'
}

$(document).ready(function() {

   function getInfo() {

       // ==== first "get" request to get ID of the uploads of the Church's YouTube channel. ====
       $.get(
           "https://www.googleapis.com/youtube/v3/channels", channelInfo, function(data) {
               $.each(data.items, function(i, item) {                              // index is "i"; items[i] === item
                   pid = item.contentDetails.relatedPlaylists.uploads;             // the "uploads" playlist ID

                   // the second "get" request to display the thumbnails.
                   getVids(pid);
               })
           }
       );
   }

   getInfo();

   // variable connected to the number of results received from the second "get" request
   var resultNumber = 10;                                                         

   // ==== the second "get" request to display the thumbnails. ====
   // ==== takes the playlist ID
   function getVids(pid) {

       $("#videos").empty();                                                       // Prevents duplicate videos from being displayed.
       $.get(
           "https://www.googleapis.com/youtube/v3/playlistItems", {
               part: 'snippet',
               maxResults: resultNumber,
               playlistId: pid,
               key: 'AIzaSyCqxm1KaFeRuiGu1vl6YcaDnmg7mU0mU_4',

           }, function(data) {
               var output;
               $.each(data.items, function(i, item) {                              // index is "i"; items[i] === item

                   videoTitle = item.snippet.title;                                // title of the video
                   videoThumb = item.snippet.thumbnails.default.url;               // the url for the videos' thumbnails

                   // ==== "making" the thumbnails ====
                   thumbnailDisplay = $("<img></img>")                       
                   $(thumbnailDisplay).attr("src", videoThumb);
                   var thumbnailClickable = $("<a></a>");                          // makes the thumbnails obviously clickable to the user
                   $(thumbnailClickable).attr("href", "#");                        // this href link won't redirect anywhere
                   $(thumbnailClickable).append(thumbnailDisplay);                 // puts the thumbnail display inside thumbnailClickable

                   $("#videos").append(videoTitle);                                // displays the video title

                   // === Displaying thumbnails to page ===
                   output = $("<div class = 'thumbnail'></div>");                  // this div will hold the thumbnail
                   var thumbnailId = "thumbnail-" + i;                             // the id that we will attach to the thumbnail div
                   $(output).attr("id", thumbnailId);                              // attaches the above id to the thumbnail div
                   $(output).html(thumbnailClickable);                             // putting the thumbnail we created inside the "output" div                               
                   $("#videos").append(output);                                    // displays the video thumbnails inside the #videos div

                   // ==== spacing to separate videos ====
                   spacing = $("<div class = 'space'></div>");
                   $("#videos").append(spacing); 

                   // ==== Function to display the clicked video to the webpage. ====
                   getVidInfo(thumbnailId, item);                                 

                   // ==== variable to keep track of the number of thumbnails displayed. ====
                   var numThumbs = $(".thumbnail").length;

                   // ==== if the number of displayed thumbs equals the max number of videos on the channel ====
                   if (numThumbs === data.pageInfo.totalResults) {
                       stopButton();
                   }
               })

               // ==== Displaying an initial video when page loads ====
               var firstVidId = data.items[0].snippet.resourceId.videoId;

               var videoLink = $("<iframe class = 'display'></iframe>");
               $(videoLink).attr("src", "https://www.youtube.com/embed/" + firstVidId);

               $("#vid-display").append(videoLink);                                            // displays the video

           }
       );
   }

   function getVidInfo(thumbnailId, item) {
       $("#" + thumbnailId).on("click", function(event) {

           event.preventDefault();

           // prevents duplicates from being displayed
           $("#vid-display").empty();

           var videoId = item.snippet.resourceId.videoId;                                  // gets the video id of the clicked thumbnail's video

           var videoLink = $("<iframe class = 'display'></iframe>");
           $(videoLink).attr("src", "https://www.youtube.com/embed/" + videoId);

           $("#vid-display").append(videoLink);                                            // displays the video
          
       })
   }

   // when pressing the "load more videos" button, load more videos.
   $("#vid-load").on("click", function(event) {
       event.preventDefault();
       resultNumber = resultNumber + 10;
       $("#load-message").html("10 more videos loaded.");
       getInfo();
   })

   // function that runs when all the channel's videos are displayed
   function stopButton() {
       $("#vid-load").off("click");
       $("#load-message").html("All videos loaded.");
   }
  
});

```

### Authentication
Authentication was implemented using the firebase auth api, which allows users to authenticate via one of several methods:

- Direct Sign-In/Up with email and password: we can use features of firebase to get users authenticated by their favorite username and password.

- Sign-In with Facebook: users can use their Facebook account to be authenticated without creating new email and password.

- Sign-In with Google: users can use their Google account to be authenticated without creating new email and password.

- Custom authentication: each time users use email and password authentication we push email and password in the firebase database as custom authentication . We can use custom authentication to collect more data to be used in future. Right now, we just push email and password to the database, but we have another version to collect more data from users when they Sign Up.  

## Lessons Learned
- How to work in a project with a group and interact with teammates in an effective way.
- How to use Github to share the code, using branches, and work on code conflicts in a team. 
- How to use different APIs in an application.
- Finding related documents and finding related articles in that document for each new subject that we need to work on. 

## Future Plans
- Adding survey to the application in order to know our members’ feedback on events and activities. 
- Adding facebook events to the application that members can see their upcoming events on the index page.


