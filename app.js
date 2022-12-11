//ORDER OF CRUD IS MATTER !!! TODO:
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Campground = require("./models/campground");
const campgroundRoute = require("./routes/campgrounds");
const dayjs = require('dayjs');
const PORT = 3000;
const morgan = require('morgan');

mongoose.connect('mongodb://localhost:27017/yelp-camp');
const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error: "));
db.once("open", () =>{
    console.log("Database connected");
});

const app = express();



const requestTime = (req,res,next) =>{
    req.requestTime = dayjs();
    return next();
}
app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.json());
//Enable for using req.body!!!
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


app.use(morgan('common'));
app.use(requestTime);


app.get('/', (req,res)=>{
    res.render('homepage', {now: req.requestTime});
})

app.use('/campgrounds', campgroundRoute);

app.use((err,req,res,next) => {
    res.send("something went wrong");
})


app.listen(PORT, () => {
    console.log(`SERVING ON PORT ${PORT}`);
})