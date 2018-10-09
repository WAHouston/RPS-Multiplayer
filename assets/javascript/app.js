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
var player1Choice = ""
var player2Choice = ""
var localName = ""
var localKey = ""
var localChoice = ""
var player1Wins = 0
var player2Wins = 0
var players = []

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

$("#create-name").click(function(event){
  event.preventDefault()
  if (players.length < 2){
    localName = $("#display-name").val().trim()
    database.ref().push({
      name: localName,
      choice: "none"
    })
  } else {
    console.log("Full")
  }

  $("#name-form").empty()
})

$("#rock").click(function(){
  if (localChoice === ""){
    localChoice = "rock"
    console.log(localChoice)
    database.ref(localKey).set({
      choice: "rock",
      name: localName
    })
  } else {
    console.log("You have already chosen")
  }
})

$("#paper").click(function(){
  if (localChoice === ""){
    localChoice = "paper"
    console.log(localChoice)
    database.ref(localKey).set({
      choice: "paper",
      name: localName
    })
  } else {
    console.log("You have already chosen")
  }
})

$("#scissors").click(function(){
  if (localChoice === ""){
    localChoice = "scissors"
    console.log(localChoice)
    database.ref(localKey).set({
      choice: "scissors",
      name: localName
    })
  } else {
    console.log("You have already chosen")
  }
})

database.ref().on("child_added", function(snapshot){
  if (snapshot.val().name === localName) {
    localKey = snapshot.key
    database.ref(localKey).onDisconnect().remove()
  }
  players.push(snapshot.val().name)
  console.log(players)
})

database.ref().on("child_removed", function(snapshot){
  players.splice(players.indexOf(snapshot.val().name), 1)
  console.log(players)
})

