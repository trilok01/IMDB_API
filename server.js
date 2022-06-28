const express = require('express');
const app = express();
const producer = require('./Routes/producer.js');
const actor = require('./Routes/actor');
const movie = require('./Routes/movie');

app.use('/producer', producer);
app.use('/actor', actor);
app.use('/movie', movie);

app.listen(4000, () => console.log('Listening on Port: 4000'));