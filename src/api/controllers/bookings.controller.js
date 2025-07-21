const { Booking, Hotel } = require('../../models');

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.userId },
      include: [{ model: Hotel, attributes: ['name', 'image'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { hotelId, checkIn, checkOut, adults, children, rooms, totalCost, guestName, guestEmail, guestPhone, specialRequests } = req.body;
    const booking = await Booking.create({
      userId: req.user.userId,
      hotelId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      numGuests: (adults || 1) + (children || 0),
      numRooms: rooms || 1,
      totalPrice: totalCost,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findOne({ where: { id, userId: req.user.userId } });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    await booking.update(req.body);
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findOne({ where: { id, userId: req.user.userId } });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    await booking.update({ status: 'cancelled' });
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
}; 