const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const scanRoutes = require('./routes/scan');
const adminRoutes = require('./routes/admin');

const connec=require('./connec');
connec();
const geminiRoutes = require('./routes/geminiRoutes.js');



require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/scan', scanRoutes);
app.use('/admin', adminRoutes);
app.use('/gemini', geminiRoutes);

// mongoose.connec(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, () => console.log('Server running on port 3000'));




















// // Backend (Express.js with MongoDB)
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const multer = require('multer');
// const fs = require('fs');
// const { compareText } = require('./textMatcher'); // Custom text matching logic
// require('dotenv').config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// // User Schema
// const UserSchema = new mongoose.Schema({
//     username: String,
//     password: String,
//     role: { type: String, default: 'user' },
//     credits: { type: Number, default: 20 }
// });
// const User = mongoose.model('User', UserSchema);

// // Document Schema
// const DocumentSchema = new mongoose.Schema({
//     userId: mongoose.Schema.Types.ObjectId,
//     content: String
// });
// const Document = mongoose.model('Document', DocumentSchema);

// // Authentication Middleware
// const authMiddleware = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).json({ message: 'Access denied' });
//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(400).json({ message: 'Invalid token' });
//     }
// };

// // User Registration
// app.post('/auth/register', async (req, res) => {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, password: hashedPassword });
//     await newUser.save();
//     res.json({ message: 'User registered' });
// });

// // User Login
// app.post('/auth/login', async (req, res) => {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
//     res.json({ token, role: user.role, credits: user.credits });
// });

// // Get User Profile
// app.get('/user/profile', authMiddleware, async (req, res) => {
//     const user = await User.findById(req.user.id);
//     res.json({ username: user.username, credits: user.credits });
// });

// // Document Upload & Matching
// const upload = multer({ dest: 'uploads/' });
// app.post('/scan', authMiddleware, upload.single('file'), async (req, res) => {
//     const user = await User.findById(req.user.id);
//     if (user.credits <= 0) {
//         return res.status(403).json({ message: 'Not enough credits' });
//     }
//     const content = fs.readFileSync(req.file.path, 'utf8');
//     await new Document({ userId: user._id, content }).save();
//     user.credits -= 1;
//     await user.save();
//     fs.unlinkSync(req.file.path);
//     res.json({ message: 'File scanned successfully' });
// });

// // Get Matching Documents
// app.get('/matches/:docId', authMiddleware, async (req, res) => {
//     const document = await Document.findById(req.params.docId);
//     const allDocs = await Document.find({ userId: req.user.id });
//     const matches = allDocs.map(doc => ({
//         docId: doc._id,
//         similarity: compareText(document.content, doc.content)
//     })).filter(m => m.similarity > 0.5);
//     res.json(matches);
// });

// // Credit Requests
// app.post('/credits/request', authMiddleware, async (req, res) => {
//     // Ideally store requests in a separate collection for admin approval
//     res.json({ message: 'Credit request submitted' });
// });

// // Analytics for Admins
// app.get('/admin/analytics', authMiddleware, async (req, res) => {
//     if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
//     const users = await User.find();
//     const totalScans = await Document.countDocuments();
//     res.json({ users, totalScans });
// });

// app.listen(5000, () => console.log('Server running on port 5000'));
