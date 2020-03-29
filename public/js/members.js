$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
    userid = data.id;
  });

  $(".post").on("click", function(event) {
    event.preventDefault();
    $.get("/api/user_data").then(function(data) {
      var headerPost = $(".header").val();
      var bodyPost = $(".body").val();
      var linkPost = $(".link").val();
      var categoryPost = $(".category").val();
      var idPost = data.id;
      $.post("/api/posts/", {
        header: headerPost,
        body: bodyPost,
        link: linkPost,
        category: categoryPost,
        UserId: idPost
      }).then(function() {
        console.log("this post worked");
        location.reload();
      });
    });
  });
  $(".like").on("click", function(event) {
    event.preventDefault();
    var post = $(this).data("postid");
    $.get("/api/user_data").then(function(data) {
      var user = data.id;
      console.log(post);
      $.post("/api/likes/", {
        UserId: user,
        PostId: post
      }).then(function() {
        console.log("this like worked");
        location.reload();
      });
    });
  });
  $(".delete").on("click", function(event) {
    event.preventDefault();
    var id = $(this).data("postid");
    queryUrl = "/api/posts/" + id;
    $.ajax({
      url: queryUrl,
      type: "DELETE",
      success: function() {
        console.log("deleted", id);
        location.reload();
      }
    });
  });
  var twitch = $(".twitch");
  // var clientId = "udzdn6yna0fjfyrq4luu79nmxr0o3n";
  var redirectUri = window.location.href;
  var returnedAuthorizationToken;
  var authorizationToken;
  twitch.on("click", function(event) {
    event.preventDefault();
    var authUrl =
      "https://id.twitch.tv/oauth2/authorize?client_id=" +
      clientId +
      "&redirect_uri=" +
      redirectUri +
      "&response_type=token&scope=user:read:broadcast";
    window.location.href = authUrl;
  });

  function getAuthorizationToken() {
    returnedAuthorizationToken = location.hash.substr(1);
    authorizationToken =
      "Bearer " +
      returnedAuthorizationToken.substring(
        returnedAuthorizationToken.indexOf("=") + 1,
        returnedAuthorizationToken.indexOf("&")
      );
    console.log(authorizationToken);
  }
  getAuthorizationToken();

  $.ajax({
    url: "https://api.twitch.tv/helix/clips?game_id=488191",
    type: "GET",
    headers: {
      // "Client-ID": clientId,
      Authorization: authorizationToken
    },
    success: function(data) {
      console.log(data);
    }
  });
});
