const { CarRental } = require('../../models');

// --- Mock Car Rental Data ---
// This simulates a database of cars available for rent.
const mockCars = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    type: 'Sedan',
    fuel_type: 'Gasoline',
    transmission: 'Automatic',
    seats: 5,
    doors: 4,
    price_per_day: 45,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
    features: ['Bluetooth', 'Backup Camera', 'Cruise Control', 'Air Conditioning'],
    available: true
  },
  {
    id: 2,
    make: 'Honda',
    model: 'CR-V',
    year: 2023,
    type: 'SUV',
    fuel_type: 'Gasoline',
    transmission: 'Automatic',
    seats: 5,
    doors: 5,
    price_per_day: 55,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
    features: ['All-Wheel Drive', 'Bluetooth', 'Backup Camera', 'Apple CarPlay'],
    available: true
  },
  {
    id: 3,
    make: 'BMW',
    model: 'X5',
    year: 2023,
    type: 'Luxury SUV',
    fuel_type: 'Gasoline',
    transmission: 'Automatic',
    seats: 7,
    doors: 5,
    price_per_day: 120,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
    features: ['Leather Seats', 'Navigation', 'Premium Sound', 'Panoramic Roof'],
    available: true
  },
  {
    id: 4,
    make: 'Hyundai',
    model: 'Elantra',
    year: 2024,
    type: 'Sedan',
    fuel_type: 'Gasoline',
    transmission: 'Automatic',
    seats: 5,
    doors: 4,
    price_per_day: 40,
    image: 'https://images.unsplash.com/photo-1617469722002-33302f3a4b64?w=400',
    features: ['Apple CarPlay', 'Android Auto', 'Blind-Spot Monitoring'],
    available: true
  },
  {
    id: 5,
    make: 'Kia',
    model: 'Sportage',
    year: 2023,
    type: 'SUV',
    fuel_type: 'Gasoline',
    transmission: 'Automatic',
    seats: 5,
    doors: 5,
    price_per_day: 60,
    image: 'https://images.unsplash.com/photo-1632512634351-903332338166?w=400',
    features: ['Panoramic Sunroof', 'Wireless Charging', 'Lane Keep Assist'],
    available: false
  }
];
// --- End Mock Data ---


exports.getCarModels = async (req, res) => {
  // Return all mock cars. The frontend will handle filtering.
  res.json({ success: true, data: mockCars });
};

exports.searchCars = async (req, res) => {
  // This endpoint can be enhanced to filter, but for now, we return all cars
  // as the frontend seems to have its own filtering logic.
  let filteredCars = [...mockCars];
  const { make, type, price_min, price_max, transmission, fuel_type } = req.query;

  if (make) {
    filteredCars = filteredCars.filter(car => car.make.toLowerCase().includes(make.toLowerCase()));
  }
  if (type) {
    filteredCars = filteredCars.filter(car => car.type.toLowerCase().includes(type.toLowerCase()));
  }
  if (price_min) {
    filteredCars = filteredCars.filter(car => car.price_per_day >= parseFloat(price_min));
  }
   if (price_max) {
    filteredCars = filteredCars.filter(car => car.price_per_day <= parseFloat(price_max));
  }
  if (transmission) {
    filteredCars = filteredCars.filter(car => car.transmission.toLowerCase() === transmission.toLowerCase());
  }
  if (fuel_type) {
    filteredCars = filteredCars.filter(car => car.fuel_type.toLowerCase() === fuel_type.toLowerCase());
  }

  res.json({ success: true, data: filteredCars, total: filteredCars.length });
};


exports.getQuote = async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.body;
    if (!carId || !startDate || !endDate) {
      return res.status(400).json({ error: 'carId, startDate, and endDate are required.' });
    }
    
    const car = mockCars.find(c => c.id == carId);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    if (days <= 0) {
      return res.status(400).json({ error: 'Invalid date range' });
    }

    const subtotal = car.price_per_day * days;
    const taxes = subtotal * 0.15; // 15% tax
    const total = subtotal + taxes;

    res.json({
      success: true,
      quote: {
        carId: car.id,
        carName: `${car.make} ${car.model}`,
        totalPrice: total,
        days,
        currency: 'USD',
        subtotal,
        taxes
      }
    });

  } catch (err) {
    res.status(500).json({ error: 'Failed to generate quote' });
  }
};

exports.bookCar = async (req, res) => {
  try {
    // This part still saves a real booking to your database
    const carRental = await CarRental.create({
      ...req.body,
      userId: req.user.userId,
    });
    res.status(201).json(carRental);
  } catch (err) {
    res.status(500).json({ error: 'Failed to book car' });
  }
}; 