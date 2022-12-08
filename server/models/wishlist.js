const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
   id: { type: String, required: true },
   title: { type: String, required: true },
   author: { type: String, required: true },
   imageUrl: { type: String, required: false },
   link: { type: String, required: false }
});

module.exports = mongoose.model('Wishlist', wishlistSchema);