var GLOBAL_user;
function fb_login() {
  console.log("logging in")
  authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin);
  firebase.auth().onAuthStateChanged((_user) => {
    if (_user) {
      console.log("logged in")
      console.log(_user)
      var uid = _user["uid"];
      GLOBAL_user = _user;
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
//this saves the scores in geoDash
function fb_savescore(score) {
  console.log("saving the score")
  firebase.database().ref('/highScores/geoDash/' + GLOBAL_user["uid"]).set(
    {
      diplayName: GLOBAL_user["displayName"],
      score: Number(score)
    }
  );
}
//this saves the scores in maskRunner
function fb_saveTheScore(score) {
  console.log("saving the score")
  firebase.database().ref('/highScores/maskRunner/' + GLOBAL_user["uid"]).update(
    {
      diplayName: GLOBAL_user["displayName"],
      score: Number(score)
    }
  );
}
function fb_saveTheTime(secondTimer) {
  console.log("saving the time")
  firebase.database().ref('/highScores/maskRunner/' + GLOBAL_user['uid']).update(
    {
      timer: Number(secondTimer)
    }
  );
}