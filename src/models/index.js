const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const config = require('../config');

console.log('[models/index.js] Using database URL:', config.databaseUrl);

const sequelize = new Sequelize(config.databaseUrl, {
  dialect: 'postgres',
  logging: false,
});

const db = {};
const modelsDir = __dirname;

fs.readdirSync(modelsDir)
  .filter((file) => file !== 'index.js' && file.endsWith('.js'))
  .forEach((file) => {
    const model = require(path.join(modelsDir, file))(sequelize);
    db[model.name] = model;
  });

// Associations
const { User, Hotel, Booking, Favorite, Review, CarRental } = db;
if (User && Booking) User.hasMany(Booking, { foreignKey: 'user_id' });
if (Booking && User) Booking.belongsTo(User, { foreignKey: 'user_id' });
if (Hotel && Booking) Hotel.hasMany(Booking, { foreignKey: 'hotel_id' });
if (Booking && Hotel) Booking.belongsTo(Hotel, { foreignKey: 'hotel_id' });
if (User && Favorite) User.hasMany(Favorite, { foreignKey: 'user_id' });
if (Favorite && User) Favorite.belongsTo(User, { foreignKey: 'user_id' });
if (Hotel && Favorite) Hotel.hasMany(Favorite, { foreignKey: 'hotel_id' });
if (Favorite && Hotel) Favorite.belongsTo(Hotel, { foreignKey: 'hotel_id' });
if (User && Review) User.hasMany(Review, { foreignKey: 'user_id' });
if (Review && User) Review.belongsTo(User, { foreignKey: 'user_id' });
if (Hotel && Review) Hotel.hasMany(Review, { foreignKey: 'hotel_id' });
if (Review && Hotel) Review.belongsTo(Hotel, { foreignKey: 'hotel_id' });
if (User && CarRental) User.hasMany(CarRental, { foreignKey: 'user_id' });
if (CarRental && User) CarRental.belongsTo(User, { foreignKey: 'user_id' });

// Export
module.exports = {
  sequelize,
  Sequelize,
  ...db,
}; 