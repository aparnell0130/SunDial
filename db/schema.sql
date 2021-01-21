-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS sundial;
-- Creates the "blogger" database --
CREATE DATABASE sundial;

USE sundial;
INSERT INTO projects(projectName, projectNumber)
VALUES ('lost','l01'),('found','f01'),('uncertain','u01');

INSERT INTO users(firstName, lastName)
VALUES ('Aaron', 'Parnell');

INSERT INTO instances(projectId,userId, timeIN,timeOut)
VALUES(1,1,'2021-01-17 15:03:00','2021-01-17 15:30:00')
;