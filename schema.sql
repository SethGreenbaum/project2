DROP DATABASE IF EXISTS passport_demo;
CREATE DATABASE passport_demo;
USE passport_demo;


INSERT INTO posts (header,body,link,category,userid,createdAt,updatedAt) VALUES ("fun game", "this game is fun", "this is a link", "games", 1, '2008-11-11','2008-11-11');
INSERT INTO posts (header,body,link,category,userid,createdAt,updatedAt) VALUES ("bad game", "this game is shit", "this is a link", "games", 2, '2008-11-11','2008-11-11');
INSERT INTO posts (header,body,link,category,userid,createdAt,updatedAt) VALUES ("meh game", "this game is alright", "this is a link", "games", 3, '2008-11-11','2008-11-11');

INSERT INTO likes (userid,postid,createdAt,updatedAt) VALUES (1,2,'2008-11-11','2008-11-11');
INSERT INTO likes (userid,postid,createdAt,updatedAt) VALUES (1,3, '2008-11-11','2008-11-11');