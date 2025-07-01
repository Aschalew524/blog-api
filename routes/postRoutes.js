const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const postController = require('../controllers/postController');

router.route('/').get(postController.getPosts).post(protect, postController.createPost);
router.route('/:id').get(postController.getPostById).put(protect, postController.updatePost).delete(protect, postController.deletePost);
router.post('/:id/like', protect, postController.toggleLike);
router.post('/:id/comments', protect, postController.addComment);
router.delete('/:id/comments/:commentId', protect, postController.deleteComment);

module.exports = router;
