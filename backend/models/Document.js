const mongoose = require('mongoose');
const DocumentSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    content: String
});
module.exports = mongoose.model('Document', DocumentSchema);