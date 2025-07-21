const { Favorite, Hotel } = require('../../models');

exports.getUserFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
      where: { userId: req.user.userId },
      include: [{ model: Hotel }],
      order: [['createdAt', 'DESC']],
    });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const { hotelId } = req.body;
    const [favorite, created] = await Favorite.findOrCreate({
      where: { userId: req.user.userId, hotelId },
      defaults: {
        userId: req.user.userId,
        hotelId,
      },
    });

    if (!created) {
      return res.status(200).json({ message: 'Hotel was already in favorites.', favorite });
    }

    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add favorite' });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const result = await Favorite.destroy({
      where: { userId: req.user.userId, hotelId },
    });
    if (result === 0) {
      return res.status(404).json({ error: 'Favorite not found' });
    }
    res.json({ message: 'Favorite removed' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
};

exports.checkFavorite = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const favorite = await Favorite.findOne({
      where: { userId: req.user.userId, hotelId },
    });
    res.json({ isFavorite: !!favorite });
  } catch (err) {
    res.status(500).json({ error: 'Failed to check favorite' });
  }
}; 