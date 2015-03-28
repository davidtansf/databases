CREATE DATABASE chat;

USE chat;



-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS `users`;
    
CREATE TABLE `users` (
  `userId` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `userName` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`userId`)
);

-- ---
-- Table 'rooms'
-- 
-- ---

DROP TABLE IF EXISTS `rooms`;
    
CREATE TABLE `rooms` (
  `roomId` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `roomName` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`roomId`)
);

-- ---
-- Table 'messages'
-- 
-- ---

DROP TABLE IF EXISTS `messages`;
    
CREATE TABLE `messages` (
  `messageId` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `userId` INTEGER NULL DEFAULT NULL,
  `roomId` INTEGER NULL DEFAULT NULL,
  `message` VARCHAR(30) NULL DEFAULT NULL,
  `timeStamp` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`messageId`)
);

-- ---
-- Table 'room/user'
-- 
-- ---

DROP TABLE IF EXISTS `room/user`;
    
CREATE TABLE `room/user` (
  `roomId` INTEGER NULL DEFAULT NULL,
  `userId` INTEGER NULL DEFAULT NULL
);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `room/user` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`userId`,`userName`) VALUES
-- ('','');
-- INSERT INTO `rooms` (`roomId`,`roomName`) VALUES
-- ('','');
-- INSERT INTO `messages` (`messageId`,`userId`,`roomId`,`message`,`timeStamp`) VALUES
-- ('','','','','');
-- INSERT INTO `room/user` (`roomId`,`userId`) VALUES
-- ('','');





/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

