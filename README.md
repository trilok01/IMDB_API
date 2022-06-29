# IMDB API

## DESCRIPTION   
This Project Contains Source Code to Design the database and build a REST API for a movie application like IMDB.  

This Project is made in `NodeJS` and `MySQL` is used for Database.  

## Requirements

[NodeJS](https://nodejs.org/en/download/)  
[MySQL](https://dev.mysql.com/downloads/windows/installer/8.0.html)
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

    ### Example   

    #### Request
    ![Add Producer Request](./Images/Add%20Producer%20Request.png)  

    #### Response

    ```JSON
    {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 8,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
    ```
    
2. Get List of Producer  
    URL: `localhost:4000/producer/`   
    METHOD: `GET`

    ### Example   

    #### Request
    ![Get Producer Request](./Images/Get%20List%20of%20Producer.png)  

    #### Response

    ```JSON
    [
        {
            "Id": 8,
            "Name": "XYZ",
            "Bio": "Producer",
            "dob": "2002-10-04",
            "Gender": "Male",
            "Company": "ABC Production"
        }
    ]
    ```

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

    ### Example   

    #### Request
    ![Add Actor Request](./Images/Add%20Actor.png)  

    #### Response

    ```JSON
    {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 11,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
    ```
   
2. Get List of Actor  
    URL: `localhost:4000/actor/`  
    METHOD: `GET`

    ### Example   

    #### Request
    ![Get Actor Request](./Images/Get%20Actor.png)  

    #### Response

    ```JSON
    [    
        {
            "Id": 11,
            "Name": "PQR",
            "Bio": "Actor",
            "dob": "2002-10-04",
            "Gender": "Male"
        }
    ]
    ```

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

    ### Example   

    #### Request
    ![Add Movie Request](./Images/Add%20Movie.png)  

    #### Response

    ```JSON
    {
        "msg": "Movie Added Successfully"
    }
    ```

2. Get List of All Movies:  
    URL: `localhost:4000/movie/`  
    METHOD: `GET`

    ### Example   

    #### Request
    ![Get All Movies Request](./Images/Get%20Movie.png)  

    #### Response

    ```JSON
    [
        {
            "ID": 23,
            "Name": "Top Gun",
            "Plot": "122",
            "Release_Date": "2022-06-11",
            "Producer_ID": 5,
            "actors": [
                {
                    "ID": 7,
                    "Name": "Trilok"
                }
            ]
        },
    ]
    ```

3. Get Movie by Movie Id:  
    URL: `localhost:4000/movie/:id`  
    METHOD: `GET`

    1. At the place of `:id` in above URL, Put `id` of the movie to get the result.

    ### Example   

    #### Request
    ![Get Movie by Id Request](./Images/Get%20Movie%20By%20Id.png)  

    #### Response

    ```JSON
    [
        {
            "ID": 23,
            "Name": "Top Gun",
            "Plot": "122",
            "Release_Date": "2022-06-11",
            "Producer_ID": 5,
            "actors": [
                {
                    "ID": 7,
                    "Name": "Trilok"
                }
            ]
        }
    ]
    ```