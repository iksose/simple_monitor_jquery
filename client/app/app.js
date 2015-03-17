$.ajax({
  url: "/api/secrets",
}).done(function(data) {
  document.getElementsByClassName("serverstatus")[0].innerHTML += " 200"
});