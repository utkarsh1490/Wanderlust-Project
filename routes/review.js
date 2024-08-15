const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview,isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

router.get("/all",
    wrapAsync(reviewController.showAllReviews));

router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.postNewReview));

router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview));

module.exports = router;