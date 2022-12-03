//ORDER OF CRUD IS MATTER !!! TODO:
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Campground = require("./models/campground");
const dayjs = require('dayjs');
const PORT = 3000;
const morgan = require('morgan');
mongoose.connect('mongodb://localhost:27017/yelp-camp');
const Schema = mongoose.Schema;
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
//NOT REAL AUTHENTICATION
function verifyPassword (req,res,next) {
    const {password} = req.query;
    console.log(password);
    if (password === "okok"){
        next();
    }else{
        res.send("Sorry, u didnt pass the wall");
    }
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

// app.use(verifyPassword);


app.get('/secret', verifyPassword,(req,res,next) =>{
    res.send("ok ok ok");
})



app.get('/', (req,res)=>{
    res.render('homepage', {now: req.requestTime});
})

app.get('/campgrounds',async (req,res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
})
//CREATE ROUTE
app.get('/campgrounds/new', (req,res)=>{
    res.render('campgrounds/new');
})

app.post('/campgrounds', async(req,res)=> {
    const newCampground = new Campground(req.body.campground);
    await newCampground.save()
    // const newCampground = new Campground({data});
    // await newCampground.save().then(res => console.log(res)).catch(err=> console.log(err));
    res.redirect(`campgrounds/${newCampground.id}`);
})

app.get('/campgrounds/:id', async (req,res)=>{
/**
 * More simple
 * const campground = await Campground.findById(req.params.id)
 */
    const {id} = req.params;
    const campgroundDetails = await Campground.findById(id);
    res.render('campgrounds/show', {campgroundDetails});
})

//EDIT ROUTE
app.get('/campgrounds/:id/edit',async (req,res) =>{
    const {id} = req.params;
    const campground = await Campground.findById(id);
    res.render("campgrounds/edit", {campground});
})
app.put('/campgrounds/:id', async(req,res)=>{
    const {id} = req.params;
    const data = req.body.campground;
    console.log(id,data);
    await Campground.findByIdAndUpdate(id,{...data});
    res.redirect(`/campgrounds/${id}`);
})
//DELETE ROUTE

app.delete('/campgrounds/:id', async(req,res) =>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})


app.use((err,req,res,next) => {
    console.log("error");
    next(err);
})

app.listen(PORT, () => {
    console.log(`SERVING ON PORT ${PORT}`);
})