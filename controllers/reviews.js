const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.createReview = async(req,res) =>{
  console.log(req.params.id);  //edit
 let listing = await Listing.findById(req.params.id);
 let newReview = new Review(req.body.review);
 newReview.author = req.user._id;
 listing.review.push(newReview);

  console.log("hii this is review")
 await newReview.save();
 await listing.save();
 console.log("New review saved");
  req.flash("success", "New Review Created!");

 res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
  await Review.findByIdAndDelete(reviewId);
   req.flash("success", "Review Deleted!");

  res.redirect(`/listings/${id}`);
};