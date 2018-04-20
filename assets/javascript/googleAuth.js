



//Global variables
var user = {
  Name: "",
  Email: "",
  Image: ""
}

var userName = "";
var userEmail = "";
var userImage = "";




  var gProvider = new firebase.auth.GoogleAuthProvider();


  //Start Google Code Here
  $("#customBtn").on('click', function () {
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
