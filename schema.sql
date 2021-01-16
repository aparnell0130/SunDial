-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS sundial;
-- Creates the "blogger" database --
CREATE DATABASE sundial;


CREATE TABLE time
(
	id int NOT NULL AUTO_INCREMENT,
	project_id varchar(255) NOT NULL,
	timeIn DATETIME NOT NULL,
    timeIN timestamp default current_timestamp NOT NULL,
    timeOut timestamp default current_timestamp NOT NULL,
	FOREIGN Key;
	PRIMARY KEY (id)
   
    
);

CREATE TABLE projects
(
	id int NOT NULL AUTO_INCREMENT,
	project_name varchar(255) NOT NULL,
	project__billing_id varchar(255) NOT NULL,
	PRIMARY KEY (id)
);
