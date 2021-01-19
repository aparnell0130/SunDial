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

CREATE TABLE instance
(
	id int NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	project_id int NOT NULL,
    timeIN TIMESTAMP NOT NULL,
    timeOut TIMESTAMP NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (user_id) REFERENCES user(id)

);

CREATE TABLE user
(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR (30) NOT NULL,
	last_name VARCHAR (30) NOT NULL
)

USE sundial;
INSERT INTO projects(project_name, project__billing_id)
VALUES ('lost','l01'),('found','f01'),('uncertain','u01');

INSERT INTO instance(project_id, timeIN,timeOut)
VALUES(1,1,'2021-01-17 15:03:00','2021-01-17 15:30:00')
;
INSERT INTO user(first_name, last_name, instance_id)
VALUES ('Aaron', 'Parnell')