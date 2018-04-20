 // Initialize Firebase


// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyC2Y1M1nveiUvDZ3qhcL8lvAOTkyER_zlM",
//   authDomain: "userauthentication-d9c13.firebaseapp.com",
//   databaseURL: "https://userauthentication-d9c13.firebaseio.com",
//   projectId: "userauthentication-d9c13",
//   storageBucket: "userauthentication-d9c13.appspot.com",
//   messagingSenderId: "341465402406"
// };
// firebase.initializeApp(config);


//Global variables
var user = {
  Name: "",
  Email: "",
  Image: ""
}

var userName = "";
var userEmail = "";
var userImage = "";

window.fbAsyncInit = function() {
  FB.init({
    appId      : '251643178731320',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

 

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
    
  });

};

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  console.log("response.status",response.status);
  
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    testAPI();
    
  }
    
  // } else {
  //   // The person is not logged into your app or we are unable to tell.
  //   document.getElementById('status').innerHTML = 'Please log ' +
  //     'into this app.';
  // }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}



// Load the SDK asynchronously
(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&appId=251643178731320&autoLogAppEvents=1';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    userName = response.name;
    
    showUserName(userName);
    // console.log('Successful login for: ' + response.name);
    // document.getElementById('status').innerHTML =
    //   'Thanks for logging in, ' + response.name + '!';
  });
}

function showUserName(name) {
 $("#welcome").html("Welcome " + name + "!");
}
