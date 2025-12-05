import dotenv from "dotenv";
dotenv.config();
import cloudinary from "cloudinary";
import path from "path";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImage(imageName) {
  const imagePath = path.join(`./public/uploads/${imageName}`);

  const result = await cloudinary.uploader.upload(imagePath);

  // wait 2 seconds then delete file
  await new Promise((resolve) => setTimeout(resolve, 2000));

  fs.unlink(imagePath, (err) => {
    if (err) console.error("Error deleting local image:", err);
  });

  return result.url;
}

export default uploadImage;
