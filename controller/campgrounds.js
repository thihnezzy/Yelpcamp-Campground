const Campground = require("../models/campground");


const getCampgrounds = async (req,res) =>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}
const newCampground = (req,res) =>{

    res.render('campgrounds/new');
}

const createCampground = async (req,res, next) =>{
    try {
        const newCampground = new Campground(req.body.campground);
        await newCampground.save();
        res.redirect(`campgrounds/${newCampground.id}`);    
    } catch (error) {
        next(error);
    }
    
}
const getCampgroundById = async (req,res)=>{
    /**
     * More simple
     * const campground = await Campground.findById(req.params.id)
     */
        const {id} = req.params;
        const campgroundDetails = await Campground.findById(id);
        res.render('campgrounds/show', {campgroundDetails});
    }
const editCampgroundGET = async (req,res) =>{
    const {id} = req.params;
    const campground = await Campground.findById(id);
    res.render("campgrounds/edit", {campground});
}

const editCampgroundPUT = async (req,res,next) =>{
    try {
        const {id} = req.params;
        const data = req.body.campground;
        console.log(id,data);
        await Campground.findByIdAndUpdate(id,{...data});
    res.redirect(`/campgrounds/${id}`);    
    } catch (error) {
        next(error)
    }
    
}

const deleteCampground = async (req,res) =>{
    const {id}= req.body;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}
module.exports = {
    getCampgrounds,
    getCampgroundById,
    editCampgroundGET,
    editCampgroundPUT,
    deleteCampground,
    newCampground,
    createCampground,
};