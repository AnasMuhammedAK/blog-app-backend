const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
//storage
const multerStorage = multer.memoryStorage();

//file type checking
const multerFilter = (req, file, callback) => {
  //check file type
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    //rejected files
    callback(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};
//PROFILE PHOTO
//------------------------------------------------------------------------------
const profilePhotoUploadMiddleware = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 }, // 1 MB maximum file size
});

//Image Resizing
const profilePhotoResize = async (req, res, next) => {
  //check if there no file
  if (!req.file) return next();
  req.file.filename = `user-${Date.now()}-${req.file.originalname}`;

  await sharp(req.file.buffer)
    .resize(250, 250)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(path.join(`public/images/profilePhoto/${req.file.filename}`))

  next()
}
//POSTS PHOTO
//------------------------------------------------------------------------------
const postPhotoUploadMiddleware = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 }, // 1 MB maximum file size
});

//Image Resizing
const postPhotoResize = async (req, res, next) => {
  //check if there no file
  if (!req.file) return next();
  req.file.filename = `user-${Date.now()}-${req.file.originalname}`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(path.join(`public/images/postPhotos/${req.file.filename}`))

  next()
}
module.exports = {
  profilePhotoUploadMiddleware,
  profilePhotoResize,
  postPhotoUploadMiddleware,
  postPhotoResize
};

