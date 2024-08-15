const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
const turf = require('@turf/turf');

module.exports.index = async (req,res)=>{
    let listings = await Listing.find();
    res.locals.currentUser = req.user;
    res.render("listings/index.ejs",{listings,title:"WANDERLUST | Home Page"});
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs",{title:"WANDERLUST | Register Listing"});
};

module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    res.locals.currentUser = req.user;
    let list = await Listing.findById(id).populate({path:"reviews",populate:{path:"createdBy"}}).populate("owner");
    if(list){
        res.render("listings/show.ejs",{list,title:`WANDERLUST | ${list.title}`});
    } else{
        req.flash("error","Listing does not exist");
        res.redirect("/listings");
    }
};

module.exports.createListing = async (req,res,next)=>{
    let response = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1
        })
        .send();
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    newListing.geometry = response.body.features[0].geometry;
    await newListing.save();
    req.flash("success","Listing Saved");
    req.flash("error","Listing cannot be saved. Some error occured");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing does not exist");
        res.redirect("/listings");
    }
    let originalImage = listing.image.url;
    originalImage.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,title:"WANDERLUST | Edit Listing",originalImage});    
};

module.exports.updateListing = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    console.log(listing);
    let response = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1
        })
        .send();
        console.log(response.body.features[0].geometry);
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
    }
    listing.geometry = response.body.features[0].geometry;
    await listing.save();
    if(listing){
        req.flash("success","Changes has been saved");
        res.redirect(`/listings/${id}`);
    } else{
        req.flash("error","Changes cannot be saved. Some error occured");
        res.redirect("/listings");
    }
};

module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    let result = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted successfully");
    req.flash("error","Listing cannot be find and delete. Some error occured");
    res.redirect("/listings");
};

module.exports.searchListing = async(req,res) => {
    let response = await geocodingClient
        .forwardGeocode({
            query: req.query.search,
            limit: 1
        })
        .send();
    let center = response.body.features[0].geometry.coordinates,radius = 200,points = [];
    var circle = turf.circle(center, radius, {
        steps: 50, // more steps create a smoother circle
        units: 'kilometers'
    });
    let listings = await Listing.find();
    for(listing of listings){
        points.push(listing.geometry.coordinates);
    }
    // console.log(points);
    var filteredCoordinates = points.filter(coord => {
        var point = turf.point(coord);
        return(turf.booleanPointInPolygon(point, circle));
    });
    if(!filteredCoordinates.length){
        req.flash("error","No such Listing we have");
        res.redirect("/listings");
    }
    listings = listings.filter(listing => filteredCoordinates.includes(listing.geometry.coordinates));
    res.locals.currentUser = req.user;
    res.render("listings/index.ejs",{listings,title:"WANDERLUST | Home Page"});
}