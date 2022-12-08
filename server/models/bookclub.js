const mongoose = require('mongoose');

const bookclubSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String, required: true },
   phone: { type: String, required: false },
   imageUrl: { type: String, required: false },
   favBooks: [{ type: mongoose.Schema.Types.ObjectId, ref:'Book' }]
});

module.exports = mongoose.model('Bookclub', bookclubSchema);