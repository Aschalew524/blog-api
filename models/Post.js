const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	text: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema({
	title: { type: String, required: true },
	body: { type: String, required: true },
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	comments: [CommentSchema],
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
