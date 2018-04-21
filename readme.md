# North Hollywood Church

# Overview
Web-site for a North-Hollywood based Church with Bootstrap CSS for styling; makes use of the Facebook Graph, Google Maps Directions, and YouTube APIs. Also features Firebase authentication with both federated resource providers and direct sign in with email and password.


# Technologies Used

## Styling
Styling was achieved via the Bootstrap CSS framework, with custom CSS added as needed.
JQuery was also utilized, primarily for ease of readability with regards to the JavaScript code.

## Functionality
In addition, the following services were utilized, accessed via the JavaScript API.

 ### Facebook Graph API
 In order to use Facebook Graph API, we need to use developers.facebook.com to create App ID and App Secret for our application. We use App ID and App Secret to get access token for our application. For each query on Facebook Graph API we need to add access token in order to get authenticated. 

Some fields required additional review by Facebook in order to be approved for usage in live applications. Right now, we cannot submit review request since Facebook is reviewing its policies. Future political climates might allow for the integration of these features as planned.

### Google Maps Directions API
Display travel directions on map and detail turn by turn to user. We added AutoComplete address to the input box. Map will look for addresses as user typing in. User can pick an address from the suggested list. 

### YouTube API
The displaying of the client’s YouTube videos was accomplished via two HTTP GET requests. The first request retrieved the YouTube ID of the client’s channel uploads, and the second request used this ID to display thumbnails of the channel’s videos and an iframe element to the page. The following is an example of these two GET requests, with each request being part of a function. Note that the second GET request is inside the first, and that an additional function is needed to attach click events to the displayed thumbnails.

## Authentication
Authentication was implemented using the firebase auth api, which allows users to authenticate via one of several methods:

- Direct Sign-In/Up with email and password: we can use features of firebase to get users authenticated by their favorite username and password.

- Sign-In with Facebook: users can use their Facebook account to be authenticated without creating new email and password.

- Sign-In with Google: users can use their Google account to be authenticated without creating new email and password.

- Custom authentication: each time users use email and password authentication we push email and password in the firebase database as custom authentication . We can use custom authentication to collect more data to be used in future. Right now, we just push email and password to the database, but we have another version to collect more data from users when they Sign Up.  


# Future Plans
- Adding survey to the application in order to know our members’ feedback on events and activities. 

- Adding facebook events to the application that members can see their upcoming events on the index page.
