const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const {isOwner,isLoggedIn,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.createListing));

router.get("/new",
    isLoggedIn,
    listingController.renderNewForm);

router.get("/search",listingController.searchListing);

router
    .route("/:id/edit")
    .get(
        isOwner,
        isLoggedIn,
        wrapAsync(listingController.renderEditForm))
    .patch(
        isOwner,
        isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListing));

router.get("/:id",
    isLoggedIn,
    wrapAsync(listingController.showListing));

router.delete("/:id/delete",
    isOwner,
    isLoggedIn,
    wrapAsync(listingController.destroyListing));

module.exports = router;