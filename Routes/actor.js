const { Router } = require('express');
const db = require('../DB/connection');
const bodyParser = require('body-parser');
const { actor_data_type } = require('../DB/tableStructure');
const validator = require('mysql-validator');

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    db.query(`SELECT * FROM ACTOR`, (err, result) => {
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

    var validation_error = [];
    for(let i = 0; i < Object.keys(req.body).length; i++) {
        var key = Object.keys(req.body)[i];
        var err = validator.check(req.body[key], actor_data_type[key]);
        if(err) validation_error.push({name: key, error: err.message});
    }

    if(validation_error.length) {
        res.send(validation_error);
    }else {
        db.query(`INSERT INTO actor (Name, Bio, DOB, Gender) VALUES ('${name}', '${bio}', '${dob}', '${gender}');`, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    }
});

module.exports = router;