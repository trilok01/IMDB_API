const { Router } = require('express');
const db = require('../DB/connection');
const util = require('util');
const bodyParser = require('body-parser');
const router = Router();
const query = util.promisify(db.query).bind(db);
const { movie_data_type } = require('../DB/tableStructure');
const validator = require('mysql-validator');

router.use(bodyParser.urlencoded({ extended: true }));

// Get List of All Movies
router.get('/', async (req, res) => {
    var movie_result;
    var map_result;
    var actor_result;

    try {
        movie_result = await query(`SELECT * FROM movie`);
        movie_result = JSON.parse(JSON.stringify(movie_result));
    } catch(err) {
        res.send(err);
    }

    for(let i = 0; i < movie_result.length; i++) {
        movie_result[i].actors = [];
        movie_result[i].Release_Date = movie_result[i].Release_Date.slice(0, 10);

        try {
            var map_result = await query(`SELECT Actor_ID from actor_movie_map where Movie_ID = ${movie_result[i].ID}`);

            for(let j = 0; j < map_result.length; j++) {
                try {
                    actor_result = await query(`SELECT ID, Name FROM actor WHERE Id = ${map_result[j].Actor_ID}`);
                    actor_result = JSON.parse(JSON.stringify(actor_result));
                    movie_result[i].actors.push(actor_result[0]);
                } catch(err) {
                    console.log(err);
                }
            }
        } catch(err) {
            console.log(err);
        }
    }
    res.send(movie_result);
});

// Get Movie by Id
router.get('/:Id', async (req, res) => {
    var movie_id = req.params.Id;

    var movie_result;
    var map_result;
    var actor_result;

    try {
        movie_result = await query(`SELECT * FROM movie WHERE ID = ${movie_id}`);
        movie_result = JSON.parse(JSON.stringify(movie_result));
    } catch(err) {
        res.send(err);
    }

    if(movie_result) {
        for(let i = 0; i < movie_result.length; i++) {
            movie_result[i].actors = [];
            movie_result[i].Release_Date = movie_result[i].Release_Date.slice(0, 10);

            try {
                var map_result = await query(`SELECT Actor_ID from actor_movie_map where Movie_ID = ${movie_result[i].ID}`);

                for(let j = 0; j < map_result.length; j++) {
                    try {
                        actor_result = await query(`SELECT ID, Name FROM actor WHERE Id = ${map_result[j].Actor_ID}`);
                        actor_result = JSON.parse(JSON.stringify(actor_result));
                        movie_result[i].actors.push(actor_result[0]);
                    } catch(err) {
                        console.log(err);
                    }
                }
            } catch(err) {
                res.send(err);
            }
        }
        res.send(movie_result);
    }
});

// Add Movie
router.post('/', async (req, res) => {
    const name = req.body.name;
    const plot = req.body.plot;
    const rel_date = req.body.release_date;
    const producer_id = req.body.producer_id;
    const actor_id = req.body.actor_id;

    var validation_error = [];
    for(let i = 0; i < Object.keys(req.body).length - 1; i++) {
        var key = Object.keys(req.body)[i];
        var err = validator.check(req.body[key], movie_data_type[key]);
        if(err) validation_error.push({name: key, error: err.message});
    }

    if(validation_error.length) {
        res.send(validation_error);
    }else {
        var insert_result;
        try {
            insert_result = await query(`INSERT INTO movie(Name, Plot, Release_Date, Producer_ID) VALUES ('${name}', '${plot}', '${rel_date}', '${producer_id}')`);
        } catch(err) {
            res.send(err);
        }

        if(insert_result) {
            const movie_id = insert_result.insertId;
            var flag = true;
            for(let i = 0; i < actor_id.length; i++) {
                try {
                    await query(`INSERT INTO actor_movie_map(Movie_ID, Actor_ID) VALUES ('${movie_id}', '${actor_id[i]}')`);
                } catch(err) {
                    await query(`DELETE FROM actor_movie_map WHERE Movie_ID = ${movie_id}`);
                    await query(`DELETE FROM movie where ID = ${movie_id}`);

                    res.status(500).send(err);
                    flag = false;
                    break;
                }
            }

            if(flag) res.send({msg: 'Movie Added Successfully'});
        }
    }

});

// Edit Movie
router.put('/', async (req, res) => {
    var Id = req.body.Id;
    var name = req.body.name;
    var plot = req.body.plot;
    var rel_date = req.body.release_date;
    var producer_id = req.body.producer_id;
    var actor_id = req.body.actor_id;

    var movie_result;

    try {
        movie_result = await query(`SELECT * FROM movie WHERE ID = '${Id}'`);
        if(movie_result.length == 0) {
            res.send({msg: 'Movie not Found'});
            res.end();
        }
    } catch(err) {
        res.send(err);
    }

    if(movie_result.length > 0) {
        var update_result;
        var delete_result;

        try {
            update_result = await query(`UPDATE movie SET Name = '${name}', Plot = '${plot}', Release_Date = '${rel_date}', Producer_ID = ${producer_id} WHERE ID = ${Id}`);            
        } catch(err) {
            res.send(err);
        }

        if(typeof update_result !== "undefined") {
            try {
                delete_result = await query(`DELETE FROM actor_movie_map WHERE Movie_ID = ${movie_result[0].ID}`);
            } catch(err) {
                res.send(err);
            }
        }

        if(typeof delete_result !== "undefined") {
            try {
                for(let i = 0; i < actor_id.length; i++) {
                    await query(`INSERT INTO actor_movie_map(Movie_ID, Actor_ID) VALUES ('${Id}', '${actor_id[i]}')`);
                }

                res.send({msg: 'Movie Updated Successfully'});
            } catch(err) {
                res.send(err);
            }
        }
    }
});

module.exports = router;

