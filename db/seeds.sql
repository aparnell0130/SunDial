USE sundial;
ALTER TABLE 	
	instances 
	CHANGE updatedAt 
	updatedAt datetime NOT NULL default current_timestamp; 
ALTER TABLE 
	instances 
	CHANGE createdAt 
	createdAt datetime NOT NULL default current_timestamp;
ALTER TABLE 
	projects 
    CHANGE updatedAt 
	updatedAt datetime NOT NULL default current_timestamp; 
ALTER TABLE
	projects 
	CHANGE createdAt 
	createdAt datetime NOT NULL default current_timestamp; 
ALTER TABLE 
	users 
    CHANGE updatedAt 
	updatedAt datetime NOT NULL default current_timestamp; 
ALTER TABLE 
	users 
    CHANGE createdAt 
	createdAt datetime NOT NULL default current_timestamp;


Send a message to pod_9










