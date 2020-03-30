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
  var clientId = "udzdn6yna0fjfyrq4luu79nmxr0o3n";
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
    url: "https://api.twitch.tv/helix/streams",
    type: "GET",
    headers: {
      // "Client-ID": clientId,
      Authorization: authorizationToken
    },
    success: function(data) {
      console.log(data);
      console.log(data.data[0].thumbnail_url);
      var qOne = "https://www.twitch.tv/" + data.data[0].user_name;
      var qTwo = "https://www.twitch.tv/" + data.data[1].user_name;
      var qThree = "https://www.twitch.tv/" + data.data[2].user_name;
      var qFour = "https://www.twitch.tv/" + data.data[3].user_name;
      var thumbUrl1 = data.data[0].thumbnail_url;
      var newThumb1 = thumbUrl1.replace("-{width}x{height}", "");
      var thumbUrl2 = data.data[1].thumbnail_url;
      var newThumb2 = thumbUrl2.replace("-{width}x{height}", "");
      var thumbUrl3 = data.data[2].thumbnail_url;
      var newThumb3 = thumbUrl3.replace("-{width}x{height}", "");
      var thumbUrl4 = data.data[3].thumbnail_url;
      var newThumb4 = thumbUrl4.replace("-{width}x{height}", "");
      console.log(newThumb1);
      $("#thumb1").attr("src", newThumb1);
      $("#thumb2").attr("src", newThumb2);
      $("#thumb3").attr("src", newThumb3);
      $("#thumb4").attr("src", newThumb4);
      $("#link1").attr("href", qOne);
      $("#link2").attr("href", qTwo);
      $("#link3").attr("href", qThree);
      $("#link4").attr("href", qFour);
      $("#streamname1").text(data.data[0].title);
      $("#streamname2").text(data.data[1].title);
      $("#streamname3").text(data.data[2].title);
      $("#streamname4").text(data.data[3].title);
      $("#user_name1").text(data.data[0].user_name);
      $("#user_name2").text(data.data[1].user_name);
      $("#user_name3").text(data.data[2].user_name);
      $("#user_name4").text(data.data[3].user_name);
    }
  });
  $.ajax({
    url: "https://api.twitch.tv/helix/games/top",
    type: "GET",
    headers: {
      // "Client-ID": clientId,
      Authorization: authorizationToken
    },
    success: function(data) {
      console.log(data);
      console.log(data.data[0].name);
      var qOne = "https://www.twitch.tv/directory/game/" + data.data[0].name;
      var qTwo = "https://www.twitch.tv/directory/game/" + data.data[1].name;
      var qThree = "https://www.twitch.tv/directory/game/" + data.data[2].name;
      var qFour = "https://www.twitch.tv/directory/game/" + data.data[3].name;
      var thumbUrl1 = data.data[0].box_art_url;
      var newThumb1 = thumbUrl1.replace("-{width}x{height}", "");
      var thumbUrl2 = data.data[1].box_art_url;
      var newThumb2 = thumbUrl2.replace("-{width}x{height}", "");
      var thumbUrl3 = data.data[2].box_art_url;
      var newThumb3 = thumbUrl3.replace("-{width}x{height}", "");
      var thumbUrl4 = data.data[3].box_art_url;
      var newThumb4 = thumbUrl4.replace("-{width}x{height}", "");
      console.log(newThumb1);
      $("#gamethumb1").attr("src", newThumb1);
      $("#gamethumb2").attr("src", newThumb2);
      $("#gamethumb3").attr("src", newThumb3);
      $("#gamethumb4").attr("src", newThumb4);
      $("#gamelink1").attr("href", qOne);
      $("#gamelink2").attr("href", qTwo);
      $("#gamelink3").attr("href", qThree);
      $("#gamelink4").attr("href", qFour);
      $("#game1").text(data.data[0].name);
      $("#game2").text(data.data[1].name);
      $("#game3").text(data.data[2].name);
      $("#game4").text(data.data[3].name);
    }
  });
});
