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
var chatMessage = ""

var gameMechanic = function(){
  if(localPlayerChoice === opponentChoice && localPlayerChoice !== "none"){
    $("#action").empty()
    $("#action").append("<p>Tie</p>")
    localChoice = "none"
    opponentChoice = "none"
    database.ref(localKey).set({
      name: localName,
      choice: "none",
      wins: localWins
    })
  } else if (localPlayerChoice === "rock" && opponentChoice === "scissors"){
    $("#action").empty()
    $("#action").append("<p>You Win!</p>")
    localWins++
    localChoice = "none"
    opponentChoice = "none"
    database.ref(localKey).set({
      name: localName,
      choice: "none",
      wins: localWins
    })
  } else if (localPlayerChoice === "scissors" && opponentChoice === "paper"){
    $("#action").empty()
    $("#action").append("<p>You Win!</p>")
    localWins++
    localChoice = "none"
    opponentChoice = "none"
    database.ref(localKey).set({
      name: localName,
      choice: "none",
      wins: localWins
    })
  } else if (localPlayerChoice === "paper" && opponentChoice === "rock"){
    $("#action").empty()
    $("#action").append("<p>You Win!</p>")
    localWins++
    localChoice = "none"
    opponentChoice = "none"
    database.ref(localKey).set({
      name: localName,
      choice: "none",
      wins: localWins
    })
  } else {
    $("#action").empty()
    $("#action").append("<p>You Lose!</p>")
    opponentWins++
    localChoice = "none"
    opponentChoice = "none"
    database.ref(localKey).set({
      name: localName,
      choice: "none",
      wins: localWins
    })
  }
  $("#local-wins").html("<p>Wins:" + localWins + "<p>")
  $("#opponent-wins").html("<p>Losses:" + opponentWins + "<p>")
}

$("#create-name").click(function(event){
  event.preventDefault()
  if (players.length < 2){
    localName = $("#display-name").val().trim()
    database.ref().push({
      name: localName,
      choice: "none",
      wins: localWins
    })
  $("#name-form").empty()
  $("<form>").addClass("chat-form").appendTo("section")
  $(".chat-form").append("<h2>Enter your message here:<h2>")
  $("<input>").attr("type", "text").attr("id", "chat-message").appendTo(".chat-form")
  $("<button>Submit</button>").attr("id", "chat-submit").appendTo(".chat-form")
  }
})

$(document).on("click", "#chat-submit", function(event){
  event.preventDefault()
  chatMessage = $("#chat-message").val()
  database.ref("chat").push({
    message: chatMessage,
    name: localName
  })
  $("#chat-message").val("")
})

$("#rock").click(function(){
  if (localChoice === "none"){
    localChoice = "rock"
    database.ref(localKey).set({
      choice: "rock",
      name: localName,
      wins: localWins
    })
  } else {
  }
})

$("#paper").click(function(){
  if (localChoice === "none"){
    localChoice = "paper"
    database.ref(localKey).set({
      choice: "paper",
      name: localName,
      wins: localWins
    })
  } else {
  }
})

$("#scissors").click(function(){
  if (localChoice === "none"){
    localChoice = "scissors"
    database.ref(localKey).set({
      choice: "scissors",
      name: localName,
      wins: localWins
    })
  } else {
  }
})

database.ref().on("child_added", function(snapshot){
  if (snapshot.val().name === localName) {
    localKey = snapshot.key
    database.ref(localKey).onDisconnect().remove()
  }
  players.push(snapshot.val().name)
})

database.ref().on("child_removed", function(snapshot){
  players.splice(players.indexOf(snapshot.val().name), 1)
  database.ref("chat").set({

  })
})

database.ref("chat").on("child_added", function(snapshot){
  $("#chat").append("<p>" + "<span>" + snapshot.val().name + ": " + "</span>" + snapshot.val().message + "</p>")
  database.ref("chat").set({
    
  })
})

database.ref().on("child_changed", function(snapshot){
  if(snapshot.key === "chat"){
    return
  }
  if (snapshot.val().name === localName){
    localPlayerChoice = snapshot.val().choice
    localWins = snapshot.val().wins
  } else {
    opponentChoice = snapshot.val().choice
    opponentWins = snapshot.val().wins
  }
  if (localPlayerChoice !== "none" && opponentChoice !== "none"){
    gameMechanic()
  } else if (localPlayerChoice !== "none" && opponentChoice === "none"){
    $("#action").append("<p>Waiting for your opponent's choice.</p>")
  } else if (localPlayerChoice === "none" && opponentChoice !== "none"){
    $("#action").append("<p>Your opponent has chosen.</p>")
  }
})