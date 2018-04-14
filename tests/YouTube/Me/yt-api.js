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


    function getVids(pid) {
        $.get(
            "https://www.googleapis.com/youtube/v3/playlistItems", { 
                part: 'snippet',
                maxResults: 10,
                playlistId: pid,
                key: 'AIzaSyCqxm1KaFeRuiGu1vl6YcaDnmg7mU0mU_4'
            }, function(data) {
                console.log(data);
                var output;
                $.each(data.items, function(i, item) {                              // index is "i"; items[i] === item
                    // console.log(item);
                    videoTitle = item.snippet.title;
                    videoId = item.snippet.resourceId.videoId;

                    videoLink = $("<iframe></iframe>");
                    $(videoLink).attr("src", "www.youtube.com/embed/" + videoId);
                    output = $("<div></div>");

                    $("#videos").append(videoTitle);
                    $(output).html(videoLink);
                    $("#videos").append(output);
                    console.log(videoTitle);

                    spacing = $("<div class = 'space'></div>");

                    $("#videos").append(spacing);   


                })
            }
        );
    }

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