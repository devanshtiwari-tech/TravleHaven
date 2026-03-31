const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage})   // multer ke ander dest, upload ko hatakr storage likh denge


router.route("/")
.get(wrapAsync(listingController.index))
.post( 
    isLoggedIn, 
    upload.single('listing[image]'),
     validateListing,
    wrapAsync(listingController.createListing)
);


 // (new route) create new listing button
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get( wrapAsync (listingController.showListings))
.put( 
    isLoggedIn, 
    isOwner,upload.single('listing[image]'), 
    validateListing, 
    wrapAsync(listingController.updateListing))
.delete( isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


//Edit Route (if user want to edit the route like given upper box)
router.get("/:id/edit",
   isLoggedIn, 
   isOwner,
    wrapAsync(listingController.renderEditForm));

module.exports = router;