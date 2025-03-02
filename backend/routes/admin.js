const express = require('express');
const User = require('../models/User');
const Document = require('../models/Document');
const router = express.Router();

router.get('/analytics', async (req, res) => {
    const users = await User.find();
    const totalScans = await Document.countDocuments();
    res.json({ users, totalScans });
});

module.exports = router;