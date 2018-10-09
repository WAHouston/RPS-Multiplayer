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
var localChoice = "none"
var localPlayerChoice = "none"
var opponentChoice = "none"
var localName = ""
var localKey = ""
var localWins = 0
var opponentWins = 0
var players = []

var gameMechanic = function(){
  if(localPlayerChoice === opponentChoice && localPlayerChoice !== "none"){
    $("#action").append("<p>Tie</p>")
    localChoice = ""
    opponentChoice = ""
    database.ref(localKey).set({
      name: localName,
      choice: "none",
      Wins: localWins
    })
  } else if (localPlayerChoice === "rock" && opponentChoice === "scissors"){
    $("#action").append("<p>You Win!</p>")
    localWins++
    localChoice = "none"
    opponentChoice = "none"
    database.ref(localKey).set({
      name: localName,
      choice: "none",
      Wins: localWins
    })
  } else if (localPlayerChoice === "scissors" && opponentChoice === "paper"){
    $("#action").append("<p>You Win!</p>")
    localWins++
    localChoice = "none"
    opponentChoice = "none"
    database.ref(localKey).set({
      name: localName,
      choice: "none",
      Wins: localWins
    })
  } else if (localPlayerChoice === "paper" && opponentChoice === "rock"){
    $("#action").append("<p>You Win!</p>")
    localWins++
    localChoice = "none"
    opponentChoice = "none"
    database.ref(localKey).set({
      name: localName,
      choice: "none",
      Wins: localWins
    })
  } else {
    $("#action").append("<p>You Lose!</p>")
    localChoice = "none"
    opponentChoice = "none"
    database.ref(localKey).set({
      name: localName,
      choice: "none",
      Wins: localWins
    })
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
  if (localChoice === "none"){
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
  if (localChoice === "none"){
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
  if (localChoice === "none"){
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

database.ref().on("child_changed", function(snapshot){
  if (snapshot.val().name === localName){
    localPlayerChoice = snapshot.val().choice
    console.log("You chose:" + localPlayerChoice)
  } else {
    opponentChoice = snapshot.val().choice
    console.log("They chose:" + opponentChoice)
  }
  if (localPlayerChoice !== "none" && opponentChoice !== "none"){
    gameMechanic()
  } else if (localPlayerChoice !== "none" && opponentChoice === "none"){
    $("#action").append("<p>Waiting for your opponent's choice.</p>")
  } else if (localPlayerChoice === "none" && opponentChoice !== "none"){
    $("#action").append("<p>Your opponent has chosen.</p>")
  }
})