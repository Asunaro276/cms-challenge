CREATE DATABASES IF NOT EXIST asunaro;
CREATE TABLE IF NOT EXISTS asunaro.contents(
`id` int(11) NOT NULL,
`title` varchar(255) NOT NULL,
`body` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
