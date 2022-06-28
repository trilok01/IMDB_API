# IMDB API

### DESCRIPTION   
This Project Contains Source Code to Design the database and build a REST API for a movie application like IMDB.  

This Project is made in `NodeJS` and `MySQL` is used for Database.  

## Getting Started
### Creating Database
1. MySQL is used for Database in this project.  
2. `queries.sql` file contains all the script for creating Database and Tables.  

### Running Source Code
1. Use `npm install` to Install all the necessary packages.
2. Go to `DB/connection.js` file, Update line number 6 with the password given during Database Creation.
3. Open root directory in terminal.
4. Use `npm run dev` to Start the Server.

## ENTITIES

1. Movie
2. Actor
3. Producer

## END POINTS
### Producer
1. Add Producer:  
    URL: `localhost:4000/producer/`  
    METHOD: `POST`  

    ### Required Input and Input Format
    |KEY|VALUE|
    |---|-----|
    |name|ABC|
    |bio|bio|
    |dob|yyyy-MM-dd|
    |gender|gender|
    |company|company|

    #### Sending Request From Postman
    1. Go to Body tab.
    2. Select `x-www-form-urlencoded`.
    3. Add all the required key and value pairs.
    4. Click Send.    
    
2. Get List of Producer  
    URL: `localhost:4000/producer/`   
    METHOD: `GET`

### Actor
1. Add actor:  
    URL: `localhost:4000/actor/`   
    METHOD: `POST`  

    ### Required Input and Input Format
    |KEY|VALUE|
    |---|-----|
    |name|ABC|
    |bio|bio|
    |dob|yyyy-MM-dd|
    |gender|gender|

    #### Sending Request From Postman
    1. Go to Body tab.
    2. Select `x-www-form-urlencoded`.
    3. Add all the required key and value pairs.
    4. Click Send.
   
2. Get List of Actor  
    URL: `localhost:4000/actor/`  
    METHOD: `GET`

### Movie
1. Add Movie:  
    URL: `localhost:4000/movie/`  
    METHOD: `POST`

    ### Required Input and Input Format
    |KEY|VALUE|
    |---|-----|
    |name|ABC|
    |plot|plot|
    |release_date|yyyy-MM-dd|
    |producer_id|producer_id|
    |actor_id|actor_id|

    #### Sending Request From Postman
    1. Go to Body tab.
    2. Select `x-www-form-urlencoded`.
    3. Add all the required key and value pairs.
    4. Click Send.

2. Get List of All Movies:  
    URL: `localhost:4000/movie/`  
    METHOD: `GET`

3. Get Movie by Movie Id:  
    URL: `localhost:4000/movie/:id`  
    METHOD: `GET`

    1. At the place of `:id` in above URL, Put `id` of the movie to get the result.