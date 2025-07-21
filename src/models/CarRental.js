const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CarRental = sequelize.define('CarRental', {
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
    carId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'car_id'
    },
    carName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'car_name'
    },
    carType: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'car_type'
    },
    pickupDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'pickup_date'
    },
    returnDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'return_date'
    },
    pickupLocation: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'pickup_location'
    },
    returnLocation: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'return_location'
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'total_price',
      validate: {
        min: 0
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
      allowNull: false,
      defaultValue: 'pending'
    },
    paymentStatus: {
      type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
      allowNull: false,
      defaultValue: 'pending',
      field: 'payment_status'
    },
    driverName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'driver_name'
    },
    driverLicense: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'driver_license'
    },
    driverAge: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'driver_age',
      validate: {
        min: 18
      }
    },
    specialRequests: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'special_requests'
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
    tableName: 'car_rentals',
    timestamps: true,
    underscored: true
  });

  return CarRental;
}; 