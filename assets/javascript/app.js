$("#create-name").on("click", function(event) {
  event.preventDefault()
  localStorage.setItem("displayName", $("#display-name").val().trim())
  $("#display-name").val("")
})
