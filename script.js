const HTML_OUTPUT_INDEX = document.getElementById("databaseOutput");

function fb_error(error) {
  console.log("there was an error reading the message");
  console.error(error);
}
var GLOBAL_user;
//this will collect your info from the form
function fb_write() {
  if (GLOBAL_user == null)
    alert("please login")
  else {
    const username = document.getElementById("name").value;
    const years = document.getElementById("age").value;
    const display = document.getElementById("gameName").value;

    const statusMessage = document.getElementById("statusMessage");
    firebase.database().ref('/users/' + GLOBAL_user["uid"]).set(
      {
        user: String(username),
        age: Number(years),
        gameName: String(display),
        displayName: GLOBAL_user["displayName"],
        email: GLOBAL_user["email"],
        photoURL: GLOBAL_user["photoURL"]
      });
  }
  HTML_OUTPUT_INDEX.innerHTML = "press the games button " + GLOBAL_user.displayName
}
//this is a button that will take you to the games after you logged in 
function showGames() {
  if (GLOBAL_user == null )
    alert("please login and fill the form")
  else {
    window.location.href = "page.html"
  }
}

async function fb_readMaskScores(){
  await firebase.database().ref('/highScores/maskRunner/'+GLOBAL_user["uid"]).orderByChild('score').limitToFirst(3).once('value', fb_displayreadMaskScores)
}

function fb_displayreadMaskScores(snapshot){
  snapshot.forEach(fb_show1Score)
}
function fb_show1Score(child){
  let play = child.val()
  document.getElementById("databaseOutput").innerHTML += play["displayName"] + play["score"]*-1
}
/*if(document.getElementById("databaseOutput")){
  fb_readMaskScores()
}*/
/*function fb_displayDetails(snapshot) {
  let dbdata = snapshot.val()
  console.log("welcome " + dbdata["user"])

  HTML_OUTPUT_INDEX.innerHTML = "welcome " + dbdata["user"] + "<h2>"
}*/
/*function helloWorld() {
  console.log("Running helloWorld()")
  firebase.database().ref('/').set(
    {
      message: 'hello world'
    }
  )
}*/