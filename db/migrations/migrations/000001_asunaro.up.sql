CREATE DATABASE IF NOT EXISTS asunaro;
CREATE TABLE IF NOT EXISTS asunaro.contents(
`id` char(36) NOT NULL,
`title` varchar(255) NOT NULL,
`body` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
