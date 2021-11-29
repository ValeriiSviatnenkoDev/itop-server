CREATE DATABASE itop;

CREATE TABLE Users(
    UserID SERIAL PRIMARY KEY,
    UserName VARCHAR(128) NOT NULL, 
    UserPassword VARCHAR(128) NOT NULL,
    UserEmail VARCHAR(128) NOT NULL,
    UserRole VARCHAR(32) NOT NULL
);

CREATE TABLE UserProfiles(
    ProfileID SERIAL PRIMARY KEY,
    ProfileUserId INT,
    ProfileName VARCHAR(128) NOT NULL,
    ProfileSurname VARCHAR(128) NOT NULL, 
    ProfileGender VARCHAR(32) NOT NULL,
    ProfileBd VARCHAR(64) NOT NULL, 
    ProfileCity VARCHAR(64) NOT NULL,
    FOREIGN KEY (ProfileUserId) REFERENCES Users (UserID)
);