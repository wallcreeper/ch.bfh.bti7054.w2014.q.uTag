DROP DATABASE IF EXISTS utag;

-- Datenbank: `utag`

CREATE DATABASE IF NOT EXISTS utag character set utf8 collate utf8_general_ci;
USE utag;


-- --------------------------------------------------------

 -- Table session

CREATE TABLE IF NOT EXISTS `session` (
  `session_id` varchar(32) NOT NULL default '',
  `http_user_agent` varchar(32) NOT NULL default '',
  `session_data` blob NOT NULL,
  `session_expire` int(11) NOT NULL default '0',
  PRIMARY KEY  (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tabellenstruktur für Tabelle `resource`
--

CREATE TABLE IF NOT EXISTS `resource` (
	`id`			MEDIUMINT UNSIGNED 		NOT NULL AUTO_INCREMENT,
	`name` 			varchar(1024) 	NOT NULL,
	`description` 	varchar(10240) 	DEFAULT NULL,
	`created` 		timestamp 		NOT NULL DEFAULT CURRENT_TIMESTAMP,
	 PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `tag` (
	`id`			MEDIUMINT UNSIGNED 		NOT NULL AUTO_INCREMENT,
	`name` 			varchar(1024) 			NOT NULL,
	`counter`		int,
	 PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `tag_resource` (
	`id`		MEDIUMINT UNSIGNED	NOT NULL AUTO_INCREMENT,
	`tag_id`	MEDIUMINT UNSIGNED,
	`resource_id`	MEDIUMINT UNSIGNED,
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `similarity` (
	`id`			MEDIUMINT UNSIGNED 		NOT NULL AUTO_INCREMENT,
	`hash`			varchar(256) 			NOT NULL,
	`tag1_id`		MEDIUMINT UNSIGNED		NOT NULL,
	`tag2_id`		MEDIUMINT UNSIGNED		NOT NULL,
	`counter`		int,
	 PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `user` (
	`id`			MEDIUMINT UNSIGNED 		NOT NULL AUTO_INCREMENT,
	`username`	varchar(1024) NOT NULL,
	`email`		varchar(1024) NOT NULL,
	`password`	varchar(1024) NOT NULL,
	 PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `tag_user` (
	`id` 		MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
	`tag_id`	MEDIUMINT UNSIGNED NOT NULL,
	`user_id`	MEDIUMINT UNSIGNED NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `resource_user` (
	`id` 			MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
	`resource_id`	MEDIUMINT UNSIGNED NOT NULL,
	`user_id`		MEDIUMINT UNSIGNED NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `similarity_user` (
	`id` 				MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
	`similarity_id`		MEDIUMINT UNSIGNED NOT NULL,
	`user_id`			MEDIUMINT UNSIGNED NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Create relationships section -------------------------------------------------

ALTER TABLE `tag_resource` 	ADD CONSTRAINT `tag_resource-tag` 		FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `tag_resource` 	ADD CONSTRAINT `tag_resource-resource` 	FOREIGN KEY (`resource_id`) REFERENCES `resource` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `similarity`	ADD CONSTRAINT `tag1_similarity` 	FOREIGN KEY (`tag1_id`) REFERENCES `tag` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `similarity`	ADD CONSTRAINT `tag2_similarity` 	FOREIGN KEY (`tag2_id`) REFERENCES `tag` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `tag_user` 		ADD CONSTRAINT `tag_user-user` 		FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `tag_user` 		ADD CONSTRAINT `tag_user-tag` 		FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `resource_user` 		ADD CONSTRAINT `resource_user-user` 			FOREIGN KEY (`user_id`) 	REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `resource_user` 		ADD CONSTRAINT `resource_user-resource` 		FOREIGN KEY (`resource_id`) REFERENCES `resource` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `similarity_user` 		ADD CONSTRAINT `similarity_user-similarity` 	FOREIGN KEY (`similarity_id`) REFERENCES `similarity` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `similarity_user` 		ADD CONSTRAINT `similaritye_user-user` 			FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;




