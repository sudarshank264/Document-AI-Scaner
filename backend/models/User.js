
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: { type: String, default: 'user' },
    credits: { type: Number, default: 20 }
});
module.exports = mongoose.model('User', UserSchema);