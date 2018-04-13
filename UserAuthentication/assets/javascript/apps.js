var config = {
    apiKey: "AIzaSyC2Y1M1nveiUvDZ3qhcL8lvAOTkyER_zlM",
    authDomain: "userauthentication-d9c13.firebaseapp.com",
    databaseURL: "https://userauthentication-d9c13.firebaseio.com",
    projectId: "userauthentication-d9c13",
    storageBucket: "userauthentication-d9c13.appspot.com",
    messagingSenderId: "341465402406"
  };
  firebase.initializeApp(config);


/************* Google Authentication ****************/

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
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
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

/************** End of Google Authencation ****************/