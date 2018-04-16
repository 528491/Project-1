/* 
Game Plan: 

Get a list of videos from a certain channel, then display them on a webpage.

1. Use the API call "channels:list" to get info about a certain channel
    a. Name
    b. Description
    c. id
    d. etc.
    e. We want: uploads playlist id

2. Take the uploads id and use that for the "playlistitems:list" method
    a. Will give us back all the videos on that channel.

NOTE: I have decided to not do the API request the ajax way. Using the $get method is more modular.

*/


/////////////////////////////////////////////////////////////

var channelName = "TechGuyWeb";

$(document).ready(function() {

    function getInfo() {
        // first "get" request
        $.get(
            "https://www.googleapis.com/youtube/v3/channels", { 
                part: 'contentDetails',
                forUsername: channelName,
                key: 'AIzaSyCqxm1KaFeRuiGu1vl6YcaDnmg7mU0mU_4'
            }, function(data) {
                // console.log(data);
                $.each(data.items, function(i, item) {                              // index is "i"; items[i] === item
                    // console.log(item);
                    pid = item.contentDetails.relatedPlaylists.uploads;

                    // the second "get" request
                    getVids(pid);
                })
            }
        );
    }

    getInfo();
    

    var resultNumber = 10;

    function getVids(pid) {
        $.get(
            "https://www.googleapis.com/youtube/v3/playlistItems", { 
                part: 'snippet',
                maxResults: resultNumber,
                playlistId: pid,
                key: 'AIzaSyCqxm1KaFeRuiGu1vl6YcaDnmg7mU0mU_4'
            }, function(data) {
                console.log(data);
                var output;
                $.each(data.items, function(i, item) {                              // index is "i"; items[i] === item

                    // console.log(item);
                    videoTitle = item.snippet.title;

                    // videoId = item.snippet.resourceId.videoId;

                    videoThumb = item.snippet.thumbnails.default.url;               // the url for the videos' thumbnails

                    // videoLink = $("<iframe></iframe>");
                    // $(videoLink).attr("src", "www.youtube.com/embed/" + videoId);

                    // "making" the thumbnails
                    thumbnailDisplay = $("<img></img>")                        
                    $(thumbnailDisplay).attr("src", videoThumb);
                    var thumbnailClickable = $("<a></a>");                          // makes the thumbnails obviously clickable to the user
                    $(thumbnailClickable).attr("href", "#");                        // this href link won't redirect anywhere
                    $(thumbnailClickable).append(thumbnailDisplay);                 // puts the thumbnail display inside thumbnailClickable

    

                    $("#videos").append(videoTitle);                                // displays the video title

                    // $(output).html(videoLink);

                    // === Displaying thumbnails to page ===
                    output = $("<div class = 'thumbnail'></div>");                  // this div will hold the thumbnail
                    var thumbnailId = "thumbnail-" + i;                             // the id that we will attach to the thumbnail div
                    $(output).attr("id", thumbnailId);
                    // $(output).html(thumbnailDisplay);      
                    $(output).html(thumbnailClickable);                             // putting the thumbnail we created inside the "output" div                                
                    $("#videos").append(output);                                    // displays the video thumbnails inside the #videos div
                    // console.log(videoTitle);

                    // spacing to separate videos
                    spacing = $("<div class = 'space'></div>");
                    $("#videos").append(spacing);   

                    getVidInfo(thumbnailId, item);                                  // Function to display the clicked video to the webpage.

                    var numThumbs = $(".thumbnail").length;
                    console.log("Number of Thumbnails: " + numThumbs);


                })

                
            }
        );
    }

    function getVidInfo(thumbnailId, item) {
        $("#" + thumbnailId).on("click", function() {

            // I need to get the information associated with the particular thumbnail that I click on
            // Once I have that data, then I can display that video by accessing its id.

            // prevents duplicates from being displayed
            $("#vid-display").empty();

            var videoId = item.snippet.resourceId.videoId;                                  // gets the video id of the clicked thumbnail's video

            var videoLink = $("<iframe class = 'display'></iframe>");
            $(videoLink).attr("src", "https://www.youtube.com/embed/" + videoId);

            $("#vid-display").append(videoLink);                                            // displays the video 
            

        })

    }


    // when pressing the "load more videos" button, load more videos.
    $("#vid-load").on("click", function() {
        // resultNumber = resultNumber + 10;
        $("#load-message").html("10 more videos loaded.");
        // $("#videos").empty();
        getInfo();                                                          // running this function again will retrieve ten more videos.
    })





});


/////////////////////////////////////////////////////////////

// another way to phrase the above code using ajax:

// var username = "thephilosophytube";
// var part = "contentDetails";

// // var queryURL = "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=" + username + "&key=AIzaSyCqxm1KaFeRuiGu1vl6YcaDnmg7mU0mU_4";

// var queryURL = "https://www.googleapis.com/youtube/v3/channels?part=" + part + "&forUsername=" + username + "&key=AIzaSyCqxm1KaFeRuiGu1vl6YcaDnmg7mU0mU_4";

// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function(response) {
//     console.log(response);
//     pid = items[0].contentDetails.relatedPlaylists.uploads;
//     getVids(pid);
// })

// // pid = playlist id

// function getVids(pid) {
//     part = "snippet";

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(response) {
//         console.log(response);
//         pid = items[0].contentDetails.relatedPlaylists.uploads;
//         getVids(pid);
//     })
// }