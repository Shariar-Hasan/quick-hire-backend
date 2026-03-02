import { Router } from 'express';
import { uploadLogo } from '../../lib/upload';
import { middleware } from '../../middlewares/base.middleware';

const router = Router();

router.post('/logo', middleware.auth, uploadLogo.single('file'), (req, res) => {
    if (!req.file) {
        res.status(400).json({ success: false, message: 'No file uploaded' });
        return;
    }

    const url = `/uploads/logos/${req.file.filename}`;
    res.json({ success: true, message: 'File uploaded', data: { url } });
});

export default router;
