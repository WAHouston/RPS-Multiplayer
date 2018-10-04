var config = {
    apiKey: "AIzaSyDxlDO-v3tK1Fgzwriml1E816Nsq8XwAuk",
    authDomain: "rps-multiplayer-5321a.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-5321a.firebaseio.com",
    projectId: "rps-multiplayer-5321a",
    storageBucket: "rps-multiplayer-5321a.appspot.com",
    messagingSenderId: "966651762129"
  };
   firebase.initializeApp(config);

var database = firebase.database()
var player1 = ""
var player2 = ""
var player1Choice = ""
var player2Choice = ""
var player1Wins = 0
var player2Wins = 0





var gameMechanic = function(){
  if(player1Choice === player2Choice){
    $("#action").append("<p>Tie</p>")
  } else if (player1Choice === "rock" && player2Choice === "scissors"){
    $("#action").append("<p>Player 1 Wins!</p>")
    player1Wins++
  } else if (player1Choice === "scissors" && player2Choice === "paper"){
    $("#action").append("<p>Player 1 Wins!</p>")
    player1Wins++
  } else if (player1Choice === "paper" && player2Choice === "rock"){
    $("#action").append("<p>Player 1 Wins!</p>")
    player1Wins++
  } else {
    $("#action").append("<p>Player 2 Wins!</p>")
    player2Wins++
  }
}
