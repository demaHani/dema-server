const { Review, User } = require('../../models');

exports.getReviewsByHotel = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { hotelId: req.params.id },
      include: [{ model: User, attributes: ['fullName'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.create({
      hotelId: req.params.id,
      userId: req.user.userId,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add review' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    if (review.userId !== req.user.userId && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    await review.destroy();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
}; 