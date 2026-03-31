const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL ="mongodb://0.0.0.0/wanderlust";


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
const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj, owner: "693c5ea9f355665ac6c183f6 // yaha pr owner id glt hai isko sahi kr doge to error nahi ayega"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};
initDB();