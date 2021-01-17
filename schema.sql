-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS sundial;
-- Creates the "blogger" database --
CREATE DATABASE sundial;

USE sundial;
CREATE TABLE projects
(
	id int NOT NULL AUTO_INCREMENT,
	project_name varchar(255) NOT NULL,
	project__billing_id varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE time
(
	id int NOT NULL AUTO_INCREMENT,
	project_id int NOT NULL,
    timeIN timestamp default current_timestamp NOT NULL,
    timeOut timestamp default current_timestamp NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
   
    
);

