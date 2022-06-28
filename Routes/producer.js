const { Router } = require('express');
const db = require('../DB/connection');
const validator = require('mysql-validator');
const { producer_data_type } = require('../DB/tableStructure');
const router = Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    db.query(`SELECT * FROM PRODUCER`, (err, result) => {
        if(err) res.send(err);

        for(var index in result) {
            result[index].dob = new Date(result[index].dob).toISOString().slice(0, 10);
        }
        res.send(result);
    });
});

router.post('/', (req, res) => {
    var name = req.body.name;
    var bio = req.body.bio;
    var dob = req.body.dob;
    var gender = req.body.gender;
    var company = req.body.company;

    var validation_error = [];
    for(let i = 0; i < Object.keys(req.body).length; i++) {
        var key = Object.keys(req.body)[i];
        var err = validator.check(req.body[key], producer_data_type[key]);
        if(err) validation_error.push({name: key, error: err.message});
    }

    if(validation_error.length) {
        res.send(validation_error);
    }else {
        db.query(`INSERT INTO producer(Name, Bio, DOB, Gender, Company) VALUES ('${name}', '${bio}', '${dob}', '${gender}', '${company}');`, (err, result) => {
            if(err) res.send(err);
            else res.send(result);
        });
    }
});

module.exports = router;