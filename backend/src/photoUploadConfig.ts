import multer, { MulterError } from "multer";
import path from "path";

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new MulterError("LIMIT_UNEXPECTED_FILE", "Invalid file type"));
  }
};

// Multer storage configurations
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "coverPhoto") {
      cb(null, "uploads/coverPhotos");
    } else if (file.fieldname === "displayPhoto") {
      cb(null, "uploads/displayPhotos");
    }
  },
  filename: (req, file, cb) => {
    const nameWithoutExt = path
      .basename(file.originalname, path.extname(file.originalname))
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-_]/g, "");

    const uniqueSuffix = `${Date.now()}-${nameWithoutExt}`;

    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

export const uploadCoverPhoto = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
});

export const uploadDisplayPhoto = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
});
