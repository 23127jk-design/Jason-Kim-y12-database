/*function helloWorld() {
  console.log("Running helloWorld()")
  firebase.database().ref('/').set(
    {
      message: 'hello world'
    }
  )
}*/
function fb_error(error) {
  console.log("there was an error reading the message");
  console.error(error);
}

function fb_write() {
  if (GLOBAL_user == null)
    alert("please login")
  else {
    const username = document.getElementById("name").value;
    const years = document.getElementById("age").value;
    const display = document.getElementById("displayName").value;

    const statusMessage = document.getElementById("statusMessage");
    firebase.database().ref('/highScores/users/' + GLOBAL_user["uid"]).set(
      {
        user: String(username),
        age: Number(years),
        displayName: String(display)
      });
  }
}
function showDetails() {
  if (GLOBAL_user == null)
    alert("please login")
  else {
    console.log("Reading details");
    firebase.database().ref('/users/' + GLOBAL_user["uid"]).once('value', fb_displayDetails, fb_error)
  }
}
function fb_displayDetails(snapshot) {
  let dbdata = snapshot.val()
  console.log("welcome " + dbdata["user"])

  HTML_OUTPUT.innerHTML = "welcome "+ dbdata["user"] + "<br>"
}