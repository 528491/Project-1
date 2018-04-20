window.fbAsyncInit = function() {
    console.log("inside window.fbAsyncInit");
    FB.init({
      appId            : '251643178731320',
      autoLogAppEvents : true,
      channelUrl       :"https://rnguyen05.github.io/Facebook/",
      xfbml            : true,
      cookie           : true,
      version          : 'v2.12'
    });


    //FB Call for Events
    FB.api("/me?fields=id,name,accounts{name,access_token}&access_token=EAADk3j5HRzgBAGjOhK2ZC0keBZBWZCNdWWAERm4jdWuZCR1pYE3qBZABfucDPcL35rHEI9HnjtIlgGP9C6XMas8Q7fZCu7HnHa691WdEOKHxNFziprJ6OQqUJdyZAhW0k7x00vqQHkZCZAtnn3rGvYJC7ENKh4bFExIfZAYtpq2ie51wZDZD",
      function(results) {
          console.log(results);
      }
    );

    //FB Call for posts 
    FB.api("/me?fields=id,name,likes,posts.limit(4){message,permalink_url},accounts{fan_count,cover},friends&access_token=EAADk3j5HRzgBAGjOhK2ZC0keBZBWZCNdWWAERm4jdWuZCR1pYE3qBZABfucDPcL35rHEI9HnjtIlgGP9C6XMas8Q7fZCu7HnHa691WdEOKHxNFziprJ6OQqUJdyZAhW0k7x00vqQHkZCZAtnn3rGvYJC7ENKh4bFExIfZAYtpq2ie51wZDZD",
        function(response) {
          var tmpTitle = response;
          console.log(tmpTitle);

          var tmp = response.posts;
          console.log(tmp);
          for (var i = 0; i < tmp.data.length; i++) {
            var headerDiv = $("<div id='headerDiv'> class='row'");
            console.log(tmp.data[i].message);

            //Church Background Image
            for (var k = 0; k < response.accounts.data.length; k++) {
              if (response.accounts.data[k].id == "112420816862") {
                var imgDiv = $("<div class='imageDiv'>");
                var logoImg = $("<img>");
                //logoImg.attr("src",response.accounts.data[k].cover.source);
                // headerDiv.css("background-image:url('"+logoImg+"');");
                //imgDiv.append(logoImg);

                var getImgSrc = $(".imageDiv logoImg").attr("src",response.accounts.data[k].cover.source);
                $("#headerDiv").css("background-image","url("+getImgSrc+")");
                //headerDiv.css("background-image", "url("+logoImg+")");
                //headerDiv.append(logoImg);
              }
            }
            
            
            var profileImg = $("<button id='logo'>");
            profileImg.attr("value",tmp.permalink_url);
            headerDiv.append(profileImg);

            //Click on logo to lead to facebook face
            //Need to check to see if user if logged in 
            //if user is not logged in, ask to log in and save login to firebase database
            $("#logo").click(function() {
              
            });

            //See more...
            //Click on logo to lead to facebook face
            //Need to check to see if user if logged in 
            //if user is not logged in, ask to log in and save login to firebase database




            //Church Name
            var churchName = response.name;
            
            //Append all items to 
            headerDiv.append("<span class='churchName'>"+churchName+"</span>");
            
            //Like button and Fan Count
            for (var k = 0; k < response.accounts.data.length; k++) {
              if (response.accounts.data[k].id == "112420816862") {
                var fanCount = $("<button id='likeBtn' class='rightHeaderDiv'>");
                fanCount.html("<i class='fab fa-facebook-square'></i>  Like");
                headerDiv.append(fanCount);
                var fc = response.accounts.data[k].fan_count;
                headerDiv.append("<span class='rightHeaderDiv'>  "+fc+" likes</span>");
                var friendcount = response.friends.summary.total_count;
                headerDiv.append("<span class='rightHeaderDiv'>  "+friendcount+" friends</span><br/>");
              }
            }

            //Post
            var bodyDiv = $("<div id='bodyDiv'> class='row'");
            var post = tmp.data[i].message.replace(/\n/g, "<br />");
            bodyDiv.append(post);
            //See more... click function
            var seeMore = $("<div id='seeMore'>");
            // seeMore.css("float","right");
            // seeMore.css("color","#3C5898");
            // seeMore.html("See more...");

            // makes "see more..." go to the webpage
            var linkToPage = $("<a></a>");
            console.log("permalink: " + tmp.data[i].permalink_url);
            $(linkToPage).attr("href", tmp.data[i].permalink_url);
            $(linkToPage).html("See more...");
            $(seeMore).append(linkToPage);
            bodyDiv.append(seeMore);
            
            
            
            
            
            //var churchName = response.name;
            // gifTitle = gifTitle.substring(0, gifTitle.indexOf('GIF'));
            // //Gif Rating
            // var gifRating = "<br />Rating: "+results[d].rating;
            // //Favorite Icon
            // var favoriteBtn = $("<button>");
            // favoriteBtn.css("float","right");
            // favoriteBtn.addClass("btn btn-fv btn-sm");
            // favoriteBtn.attr("value",results[d].images.preview_gif.url);
            // favoriteBtn.attr("title","Add to Favorites");
            // favoriteBtn.html("<i class='fas fa-heart'></i>");

            // //Download icon
            // var downloadBtn = $("<button>");
            // downloadBtn.css("float","right");
            // downloadBtn.addClass("btn btn-dl btn-sm");
            // downloadBtn.attr("value",results[d].images.fixed_height.url);
            // downloadBtn.attr("title","Download");
            // downloadBtn.html("<i class='fas fa-download'></i>");

            //gifDiv.append("<strong>"+toTitleCase(gifTitle)+"</strong>");
            // gifDiv.append(gifRating);
            // gifDiv.append(downloadBtn);
            // gifDiv.append(favoriteBtn);
            
            

            $("#showPost").append(headerDiv);  
            $("#showPost").append(bodyDiv);   
          }//end for loop

          // console.log(response);
          // //create cover image background
          // var coverImg = new Image();
          // coverImg.src = response.accounts.data[2].cover.source;
          // document.getElementById("showPage").setAttribute("style", "background-color:gray;");
          
          // // tmpImg.setAttribute("style", 'background-img: url("'+coverImg+'");');
          // // document.getElementById('banner').setAttribute("style", "background-image: url(" + dir + images[randomCount] + ");background-repeat: no-repeat;background-size: 388px 388px");

          // //Show fan_count
          // var newDiv = document.getElementById("showPost");
          // newDiv.innerHTML+= "<div>"+response.name+"<br/>"+response.accounts.data[2].fan_count+" likes"+
          // "</div><br/>";
        }
      );

    // FB.api('/me?fields=id,name,accounts{app_id,app_links,access_token,fan_count,cover}&id=575674122812947','GET',
    //   function(response) {
    //       console.log("here");//console.log(repsonse);
    //       if(!response || response.error){
    //         alert('error');
    //       }
    //       else {
    //         console.log('ID:'+JSON.stringify(response));
    //       }
    //   }
    // );

  };//End of window.fbAsyncInit = function()

  

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&appId=251643178731320&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));




    













