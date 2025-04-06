import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    fs.unlinkSync(localFilePath); // Remove the file after successful upload
    return response;
  } catch (err) {
    fs.unlinkSync(localFilePath); // Ensure file is deleted even if there's an error
    console.error('Cloudinary upload error:', err);
    return null;
  }
};

export { uploadOnCloudinary };
