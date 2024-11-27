const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors'); 
const port = process.env.PORT || 8000;
const productRoutes = require('./src/routes/index');
require('dotenv').config();

const app = express();

app.use(cors());  

app.use(express.json());
mongoose.connect(process.env.MONGODB_URI, {})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('API is working');
});

app.listen(port, () => {
    console.log(`Connected to Port no. ${port}`);
});
