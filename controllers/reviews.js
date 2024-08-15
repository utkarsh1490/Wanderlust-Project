const Listing = require("../models/listing");
const Review = require("../models/reviews");

module.exports.showAllReviews = async(req,res)=>{
    res.locals.currentUser = req.user;
    let listing = await Listing.findById(req.params.id).populate({path : "reviews",populate:{path:"createdBy"}});
    res.render("listings/reviews.ejs",{listing,title:"WANDERLUST | All Reviews"});
};

module.exports.postNewReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    const review = new Review(req.body.reviews);
    review.createdBy = req.user._id;
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    req.flash("success","Review has been created");
    req.flash("error",`Review cannot be saved. Some error occured. <br> Please try again.`)
    res.redirect(`/listings/${req.params.id}`);
};

module.exports.destroyReview = async(req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review has been deleted");
    req.flash("error","Review cannot be deleted. Some error occured. <br> Please try again.")
    res.redirect(`/listings/${id}`);
};