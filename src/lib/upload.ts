import multer from 'multer';
import path from 'path';
import fs from 'fs';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

const LOGO_DIR = path.join(process.cwd(), 'uploads', 'logos');
const RESUME_DIR = path.join(process.cwd(), 'uploads', 'resumes');

// Ensure upload directories exist
if (!fs.existsSync(LOGO_DIR)) fs.mkdirSync(LOGO_DIR, { recursive: true });
if (!fs.existsSync(RESUME_DIR)) fs.mkdirSync(RESUME_DIR, { recursive: true });

const makeStorage = (dir: string) =>
    multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, dir),
        filename: (_req, file, cb) => {
            const ext = path.extname(file.originalname).toLowerCase();
            const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
            cb(null, uniqueName);
        },
    });

const imageFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
};

const pdfFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed'));
};

export const uploadLogo = multer({
    storage: makeStorage(LOGO_DIR),
    fileFilter: imageFilter,
    limits: { fileSize: 3 * 1024 * 1024 }, // 3 MB
});

export const uploadResume = multer({
    storage: makeStorage(RESUME_DIR),
    fileFilter: pdfFilter,
    limits: { fileSize: MAX_FILE_SIZE }, // 50 MB
});
