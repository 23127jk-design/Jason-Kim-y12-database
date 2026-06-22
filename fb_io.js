var GLOBAL_user;
function fb_login() {
  console.log("logging in")
  authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("logged in")
      console.log(user)
      var uid = user.uid;
      GLOBAL_user = user;
      firebase.database().ref("/highScores/users").update(
        {
          name: GLOBAL_user.displayName
        }
      )
    } else {
      console.log("not logged in")
      // user is signed out
    }
  });
}

function fb_handleLogin(_user) {
  if (_user) {
    console.log("user is logged in")
    GLOBAL_user = _user; // save the user object to a global varible
  } else {
    console.log("user is NOT logged in - starting the popup process")
    fb_popupLogin();
  }
}
function fb_popupLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then((result) => {
    GLOBAL_user = result.user; //save the user details object to a globel variable
    console.log("User has logged in")
  });
}
var authenticationListener
function fb_logout() {
  authenticationListener();
  firebase.auth().signOut();
  console.log("logged out (hopefully)")
}
function fb_error(error) {
  console.log("there was an error reading the message");
  console.error(error);
}
function fb_savescore(score) {
  console.log("saving the score")
  firebase.database().ref('/geoDash/user/' + GLOBAL_user["uid"]).set(
    {
      score: Number(score)
    }
  );
}
function fb_saveTheScore(score) {
  console.log("saving the score")
  firebase.database().ref('/maskRunner/user/' + GLOBAL_user["uid"]).set(
    {
      score: Number(score)
    }
  );
}