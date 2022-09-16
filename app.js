const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/yelp-camp');
const Schema = mongoose.Schema;
const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error: "));
db.once("open", () =>{
    console.log("Database connected");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.get('/', (req,res)=>{
    res.render('homepage');
})

app.listen(PORT, () => {
    console.log(`SERVING ON PORT ${PORT}`);
})