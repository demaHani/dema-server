const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    hotelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'hotel_id'
    },
    checkInDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'check_in_date'
    },
    checkOutDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'check_out_date'
    },
    numGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'num_guests'
    },
    numRooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'num_rooms'
    },
    roomType: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'room_type',
      defaultValue: 'Standard Room'
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'total_price'
    },
    guestName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'guest_name'
    },
    guestEmail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'guest_email'
    },
    guestPhone: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'guest_phone'
    },
    specialRequests: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'special_requests'
    },
    paymentMethod: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'payment_method'
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
      allowNull: false,
      defaultValue: 'confirmed'
    },
    paymentStatus: {
      type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
      allowNull: false,
      defaultValue: 'pending',
      field: 'payment_status'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_at'
    }
  }, {
    tableName: 'bookings',
    timestamps: true,
    underscored: true
  });

  return Booking;
}; 