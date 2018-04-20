// Initialize Firebase
var config = {
    apiKey: "AIzaSyC80yUq1_n29oubnc_nisGuDUUzYKhuLO8",
    authDomain: "master-d1d42.firebaseapp.com",
    databaseURL: "https://master-d1d42.firebaseio.com",
    projectId: "master-d1d42",
    storageBucket: "master-d1d42.appspot.com",
    messagingSenderId: "1005294506678"
  };
  firebase.initializeApp(config);


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



/************* Authentication ****************/

  var gProvider = new firebase.auth.GoogleAuthProvider();

  var fProvider = new firebase.auth.FacebookAuthProvider();

  //Start Google Code Here
  $("#googleBtn").on('click', function () {
    firebase.auth().signInWithPopup(gProvider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
  
      userName = user.displayName;
      showUserName(userName);
    
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
    //Get profile info
    function onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      // var auth2 = gapi.auth2.getAuthInstance().signOut();
      //auth2.disconnect();
  
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present. 
    }
  });
  
  //End of Google Code 



/******************** */
window.fbAsyncInit = function() {
  FB.init({
    appId      : '944822342345520',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

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
      js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&appId=944822342345520&autoLogAppEvents=1';
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

/******************** */


  //Start Facebook Code Here
//   firebase.auth().signInWithPopup(fProvider).then(function(result) {
//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;

    
//     showUserName(userName);

//   }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });


//   FB.logout(function(response) {
//     // Person is now logged out
//  });
  //End of Facebook Code



//Login with username and password
const txtEmail=document.getElementById("username");
const txtPass=document.getElementById("password");
const btnLogin=document.getElementById("login");
const btnSignUp=document.getElementById("SignUp");
const btnLogOut=document.getElementById("LogOut");
btnLogin.addEventListener("click", e => {
  const email = txtEmail.value;
  const pass = txtPass.value;
  const promise = firebase.auth().signInWithEmailAndPassword(email,pass);
  promise.catch(e=> console.log(e.message));
});
btnSignUp.addEventListener("click",e =>{
  const email = txtEmail.value;
  const pass = txtPass.value;
  const promise = firebase.auth().createUserWithEmailAndPassword(email,pass);
  promise.catch(e=> console.log(e.message));
});
btnLogOut.addEventListener("click", e=>{
    firebase.auth().signOut();
});
firebase.auth().onAuthStateChanged(firebaseUser =>{
  if(firebaseUser){
      console.log(firebaseUser);
      btnLogOut.classList.remove("hide");
  }
  else{
      console.log("not logged in ");
      btnLogOut.classList.add("hide");
  }
});
//End of Login with username and password

  
  function showUserName(userName) {
    $(".showUserName").html("Hi " + userName);
  }







  //GOOGLE SignOut ++++NOT WORKING YET++++
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

/************** End of Google Authencation ****************/