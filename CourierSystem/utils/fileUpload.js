const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

// Only these image types are accepted
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB



function createImageUploader(subfolder) {
    const uploadDir = path.join(__dirname, '..', 'uploads', subfolder);

    // Make sure the folder exists before Multer tries to write into it
    fs.mkdirSync(uploadDir, { recursive: true });

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {

            const ext = path.extname(file.originalname);
            const uniqueName = `${Date.now()}-${crypto.randomUUID()}${ext}`;
            cb(null, uniqueName);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only image files (jpeg, png, gif, webp) are allowed.'));
        }
    };

    return multer({
        storage,
        fileFilter,
        limits: { fileSize: MAX_FILE_SIZE_BYTES }
    });
}

module.exports = { createImageUploader };