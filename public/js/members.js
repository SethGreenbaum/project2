$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var userid;
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
    likeQuery = "/api/likes/" + data.id;
    userid = data.id;
  });
  $.post("/api/posts/", {
    header: "header",
    body: "body",
    link: "link",
    category: "moo",
    userid: userid
  }).then(function() {
    console.log("this worked");
  });
});
