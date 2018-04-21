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
