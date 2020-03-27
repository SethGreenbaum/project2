$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
  var twitch = $(".twitch");
  var clientId = "udzdn6yna0fjfyrq4luu79nmxr0o3n";
  var redirectUri = window.location.href;
  var returnedAuthorizationToken;
  var authorizationToken;
  twitch.on("click", function(event){
    event.preventDefault();
    var authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=viewing_activity_read`;
    window.location.href = authUrl;
  });
  function getAuthorizationToken(){
    returnedAuthorizationToken = location.hash.substr(1);
    authorizationToken = "Bearer "+returnedAuthorizationToken.substring(returnedAuthorizationToken.indexOf("=")+1,returnedAuthorizationToken.indexOf("&"));
    console.log(authorizationToken);
  };
  getAuthorizationToken();

});