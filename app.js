if(process.env.NODE_ENV != "production") {
require('dotenv').config();
}



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path= require("path");
const methodOverride = require("method-override");
const sampleListings=require("./init/data.js");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const { listingSchema } = require("./schema.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const MONGO_URL1 ="mongodb://0.0.0.0/wanderlust";
const MONGO_URL = "mongodb+srv://Devansh123:12345@wandurlast.ytnpelx.mongodb.net/?appName=wandurlast";


main ()
.then(()=> {
    console.log("connected to db");     
})
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const sessionOptions= {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};
// // API
// app.get("/", (req,res) => {
//       res.send("Hi,i am root");
// });


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    // console.log(res.locals.success);
    next();
});


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/",userRouter);

const validateListing = (req, res, next) => {
 let {error} = listingSchema.validate(req.body);
         if (error){
          let errMsg = error.details.map((el) =>el.message).join(",");
         throw new ExpressError(404,errMsg);
         } 
         else {
          next();
         }
};


app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});
//error handling (agar koi bhi image pr click kroge to waha pr koi informatin nahi hoga to show krega"something went wrong")
app.use((err, req, res, next) =>{
  let {statusCode=500, message = "Something went wrong!"} = err;
   res.status(statusCode).render("error.ejs", {message});
  // res.status(statusCode).send(message);
});




// root, to response to the browser
app.listen(8080, () => {
    console.log("server is running to port 8080");
});