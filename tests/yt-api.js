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

*/

// var queryURL = "https://www.googleapis.com/youtube/v3/channels";

// $.ajax({
//     url: queryURL, 
// })

/////////////////////////////////////////////////////////////

// var channelName = "TechGuyWeb";

// $(document).ready(function() {
//     $.get(
//         "https://www.googleapis.com/youtube/v3/channels", { 
//             part: 'contentDetails',
//             forUsername: channelName,
//             key: 'AIzaSyCqxm1KaFeRuiGu1vl6YcaDnmg7mU0mU_4'
//         }, function(data) {
//             $.each(data.items, function(i, item) {
//                 console.log(item);

//             })
//         }
//     );

// });


/////////////////////////////////////////////////////////////

// another way to phrase the above code:

var username = "thephilosophytube";

var queryURL = "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=" + username + "&key=AIzaSyCqxm1KaFeRuiGu1vl6YcaDnmg7mU0mU_4";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
    // getVids(pid);
})