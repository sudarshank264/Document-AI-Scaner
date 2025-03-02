const express = require('express');
const multer = require('multer');
const fs = require('fs');
const User = require('../models/User');
const Document = require('../models/Document');
const { compareText } = require('../utils/textMatcher');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user.credits <= 0) return res.status(403).json({ message: 'Not enough credits' });
    const content = fs.readFileSync(req.file.path, 'utf8');
    await new Document({ userId: user._id, content }).save();
    user.credits -= 1;
    await user.save();
    fs.unlinkSync(req.file.path);
    res.json({ message: 'File scanned successfully' });
});

router.get('/:docId', async (req, res) => {
    const document = await Document.findById(req.params.docId);
    const allDocs = await Document.find({ userId: req.user.id });
    const matches = allDocs.map(doc => ({
        docId: doc._id,
        similarity: compareText(document.content, doc.content)
    })).filter(m => m.similarity > 0.5);
    res.json(matches);
});

module.exports = router;