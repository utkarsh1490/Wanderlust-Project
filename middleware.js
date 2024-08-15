const Listing = require("./models/listing.js");
const Review  = require("./models/reviews.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");
const {reviewSchema} = require("./schema.js");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","please login");
        return res.redirect("/login");
    };
    next();
};

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req,res,next) => {
    let {id} = req.params;
    try{
        res.locals.currentUser = req.user._id;
        let listing = await Listing.findById(id);
        if(!listing.owner._id.equals(res.locals.currentUser)){
            req.flash("error","You don't have permission of the administrator");
            return res.redirect(`/listings/${id}`);
        };
        next();
    } catch(err){
        req.flash("error","You have been logged out");
        res.redirect("/login");
    };
};

module.exports.isReviewAuthor = async(req,res,next) => {
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.createdBy.equals(req.user._id)){
        req.flash("error","You don't have permission of the administrator");
        return res.redirect(`/listings/${id}/reviews/all`);
    };
    next();
};

module.exports.validateListing = (req,res,next) => {
    let result = listingSchema.validate(req.body);
    if (result.error){
        throw new ExpressError(400,result.error);
    } else{
        next();
    };
};

module.exports.validateReview = (req,res,next) => {
    let result = reviewSchema.validate(req.body);
    if (result.error){
        throw new ExpressError(400,result.error);
    } else{
        next();
    };
};