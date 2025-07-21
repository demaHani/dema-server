const { User, Hotel, Booking } = require('../../models');
const { Op } = require('sequelize');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalHotels = await Hotel.count();
    const totalBookings = await Booking.count();
    const totalUsers = await User.count({ where: { isAdmin: false } });
    const totalRevenue = await Booking.sum('totalPrice', { where: { status: 'confirmed' } });
    res.json({ totalHotels, totalBookings, totalUsers, totalRevenue: totalRevenue || 0 });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

exports.getRecentBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [{ model: User, attributes: ['fullName'] }, { model: Hotel, attributes: ['name'] }],
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recent bookings' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ where: { isAdmin: false }, order: [['createdAt', 'DESC']] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.findAll({ order: [['createdAt', 'DESC']] });
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
};

exports.createHotel = async (req, res) => {
  console.log('--- Received request to create hotel ---');
  console.log('Request Body:', req.body);
  try {
    const hotel = await Hotel.create(req.body);
    console.log('--- Hotel created successfully ---');
    res.status(201).json(hotel);
  } catch (err) {
    console.error('--- Error creating hotel ---');
    console.error('Error Details:', err);
    console.error('-----------------------------');
    res.status(500).json({ error: 'Failed to create hotel', details: err.message });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (!hotel) return res.status(404).json({ error: 'Hotel not found' });
    await hotel.update(req.body);
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update hotel' });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const result = await Hotel.destroy({ where: { id: req.params.id } });
    if (result === 0) return res.status(404).json({ error: 'Hotel not found' });
    res.json({ message: 'Hotel deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete hotel' });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({ order: [['createdAt', 'DESC']], include: [User, Hotel] });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    await booking.update({ status: req.body.status });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update booking status' });
  }
}; 