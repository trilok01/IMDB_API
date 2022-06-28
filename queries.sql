ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'TriLok@01.';

CREATE DATABASE IMDB;

USE IMDB;

DROP TABLE IF EXISTS Producer;
DROP TABLE IF EXISTS Actor;
DROP TABLE IF EXISTS Movie;
DROP TABLE IF EXISTS Actor_Movie_Map;

CREATE TABLE IF NOT EXISTS Producer (
    Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(200) NOT NULL,
    Bio VARCHAR(200),
    DOB VARCHAR(20),
    Gender VARCHAR(20),
    Company VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS Actor (
    Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(200) NOT NULL,
    Bio VARCHAR(200),
    DOB VARCHAR(20),
    Gender VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS Movie (
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(200) NOT NULL,
    Plot VARCHAR(200),
    Release_Date VARCHAR(20),
    Producer_ID INT,
    FOREIGN KEY (Producer_ID) REFERENCES Producer(Id)
);

CREATE TABLE IF NOT EXISTS Actor_Movie_Map (
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Movie_ID INT,
    Actor_ID INT,
    FOREIGN KEY (Movie_ID) REFERENCES Movie(Id),
    FOREIGN KEY (Actor_ID) REFERENCES Actor(Id)
);