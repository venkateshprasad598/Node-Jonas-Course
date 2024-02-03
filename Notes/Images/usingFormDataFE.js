// Image upload using using multer

// Example let's say you uploading files to /tour routes, go to it's controllers

//1. tourController.js
const multer = require("multer");
const aws = require("aws-sdk");

// Configure AWS SDK
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// For single image
const uploadMiddleWare = upload.single("image");
//For multiple images

// exports.uploadMiddleWare = upload.fields([
//   { name: "imageCover", maxCount: 1 },
//   { name: "images", maxCount: 3 },
// ]);

// const resizeImages = catchAsync(async (req, res, next) => {
//   if (!req.files.imageCover || !req.files.images) return next();

//   // 1) Cover image
//   req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
//   await sharp(req.files.imageCover[0].buffer)
//     .resize(2000, 1333)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toFile(`public/img/tours/${req.body.imageCover}`);

//   // 2) Images
//   req.body.images = [];

//   await Promise.all(
//     req.files.images.map(async (file, i) => {
//       const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

//       await sharp(file.buffer)
//         .resize(2000, 1333)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(`public/img/tours/${filename}`);

//       req.body.images.push(filename);
//     })
//   );

//   next();
// });

const uploadToS3 = async (req, res, next) => {
  const file = req.file;

  // Ensure a file was provided
  if (!file) {
    return res.status(400).json({ error: "No file provided" });
  }

  // Upload the file to S3
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${Date.now()}_${path.basename(file.originalname)}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const s3Response = await s3.upload(params).promise();
  req.body = {
    filename: path.basename(file.originalname),
    contentType: file.mimetype,
    s3Key: params.Key,
    imageUrl: s3Response.Location,
  };
};

app.post("/api/upload", uploadMiddleWare, uploadToS3, async (req, res) => {
  try {
    // Create a new image document in MongoDB
    const newImage = await Image.create(req.body);

    res.json({ success: true, imageUrl: newImage?.imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
