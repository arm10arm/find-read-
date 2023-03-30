CREATE TABLE `commentss` (
    `user_id` int(255) not NULL,
    `username` varchar(255) not NULL,
    `comment` TEXT not NULL
);

CREATE TABLE `user` (
    `user_id` int(255) not NULL UNIQUE ,
    `username` varchar(255) not NULL UNIQUE,
    `password` varchar(255) not NULL UNIQUE,
    `first_name` varchar(255) not NULL,
    `last_name` varchar(255) not NULL,
    `email` varchar(255) not NULL UNIQUE,
    PRIMARY KEY (`user_id`)
);

CREATE TABLE `member` (
  `user_id` int(255) NOT NULL UNIQUE,
  `username` varchar(255) not NULL UNIQUE,
  PRIMARY KEY (`user_id`)
);

CREATE TABLE `wishlist` (
    `user_id` int(255) NOT NULL ,
    `book_name` varchar(255) not NULL,
    `book_type` varchar(255) not NULL
);

CREATE TABLE `admin` (
  `user_id` int(255) NOT NULL UNIQUE,
  `username` varchar(255) not NULL UNIQUE,
  PRIMARY KEY (`user_id`)
);

CREATE TABLE `books` (
  `book_name` varchar(255) not NULL UNIQUE,
  `author` varchar(255) not NULL,
  `book_type` varchar(255) not NULL,
  `publisher` varchar(255) not NULL,
  `book_img` varchar(255) not NULL UNIQUE
)