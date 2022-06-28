const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'TriLok@01.',
    database: 'imdb'
});

con.connect((err) => {
    if(err) console.log(err);
    else {
        con.query(`CREATE TABLE IF NOT EXISTS abc (
        Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(200) NOT NULL,
        Bio VARCHAR(200),
        DOB VARCHAR(20),
        Gender VARCHAR(20)
        );`);
        console.log('Database Connection Successful...');
    }
});

module.exports = con;