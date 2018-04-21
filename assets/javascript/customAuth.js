
var database = firebase.database();
function checkEmail(emailStr){
var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  if (filter.test(emailStr))
      testresults = true;
  else {
      alert("Please input a valid email address!");
      testresults = false;
  }
  return (testresults);
}
$(document).ready(function(e){

    $("#LogOut").hide(); 
    $("#submitSignUn").hide();
    $("#login").hide();
    firebase.auth().onAuthStateChanged(function(firebaseUser){
      if(firebaseUser){
        console.log(firebaseUser.uid);
        console.log(firebaseUser.email);
        $("#LogOut").show();
        $("#submitSignUn").hide();
        $("#login").hide();
        $("#welcome").html(firebaseUser.email +"is loggeded in");  
      }
      else{
        console.log('not logged in');
        $("#LogOut").hide();
        $("#login").show();
        $("#submitSignUn").show();
        // $("#welcome").html("You are not logged in");
     
      }
    });
});
$("#login").on("click",function(){

  var email = $("#usernameLogin").val().trim(); 
  var pass1 = $("#passwordLogin").val().trim();

  var pass = pass1.toString(); 

  firebase.auth().signInWithEmailAndPassword(email,pass).then(function(user){
    console.log(JSON.stringify(user));
    $("#LogOut").show();
  }).catch(function(error){
    if(error.code == "auth/invalid-email"){
      alert("wrong pass or username");
    }
    if(error.code == "auth/wrong-password"){
          alert("wrong pass or username");
    }
    if(error.code == "auth/user-not-found"){
      $("#welcome").html("You are first time user. Please, Sign Up first.");
    }
    console.log(error.code);
    console.log(error.message);
  });
});

$("#submitSignUn").on("click",function(){

    var email =$("#usernameLogin").val();
    console.log(email+":"+ checkEmail(email)); 
    var password = $("#passwordLogin").val();
    signUp(email,password);
});
$("#LogOut").on("click",function(){
    firebase.auth().signOut();
    $("#login").show();
    $("#SignUp").show();
});
function signUp(email,password){
    firebase.auth().createUserWithEmailAndPassword(email,password).then(function(user){
    useruid = user.uid;
    firebase.database().ref('/Users/'+useruid).push({
    email : email,
    password : password
  
}).catch(function(error){
  if(error.code.toString() == "auth/weak-password"){
      alert("Your password is so weak. Please, select another password.");
  }
  if(error.code == "auth/email-already-in-use"){
      alert("this email is already in use by another user. Please, select another email.");
  }
  console.log("SALAM:" ,error.message);
  console.log(error.code);
}).then(function(){
  location.reload();
});
});

$("#SignUp").hide();
$("#LogOut").show();
$("#login").hide();
}


