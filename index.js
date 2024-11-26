const express = require("express");
const mongoose = require('mongoose')
const port = process.env.PORT || 5000
const productRoutes= require('./src/routes/index')
require('dotenv').config();


const app = express()
app.use(express.json());
mongoose.connect(process.env. MONGODB_URI,{})
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch((err)=>{
    console.log("Error connecting to MongoDB", err)
})

app.use('/api/products', productRoutes);





app.listen(port, () => {

    console.log(`Connected to Port no. ${port}`);
})

