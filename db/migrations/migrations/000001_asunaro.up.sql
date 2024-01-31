CREATE DATABASE IF NOT EXISTS cms;
CREATE TABLE IF NOT EXISTS cms.contents(
`id` char(36) NOT NULL COMMENT 'コンテンツID',
`title` varchar(255) NOT NULL,
`body` text NOT NULL
) COMMENT 'コンテントテーブル' ENGINE=InnoDB DEFAULT CHARSET=utf8;
