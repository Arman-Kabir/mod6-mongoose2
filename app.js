const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// middlewares
app.use(express.json());
app.use(cors());

// routes
const productRoute = require('./routes/product.route');

app.get('/', (req, res) => {
    res.send("Route is workigng");

});

// post route - posting to db
app.use('/api/v1/product',productRoute)

// app.get('/api/v1/product',)

module.exports = app;