const { Hotel, Review, User } = require('../../models');

exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
};

exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch hotel' });
  }
}; 