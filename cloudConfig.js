// isme cloudanary aur multer storage file error kr raha hai, isme storagew file error kr sakta hai 


const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'TravelHaven_DEV',
    allowedFormat: ["png", "jpg", "jpeg"]
  },
});

module.exports = {
    cloudinary, 
    storage
}