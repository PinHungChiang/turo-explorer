import type { Vehicle } from '../types';
// Reference text is transcribed from supplied screenshots. Booking data is simulated.
export const vehicles: Vehicle[] = [
  { id: 'ford-mustang', name: 'Ford Mustang', year: 2019, category: 'Sports', price: 89, rating: '4.92', trips: 100,
    image: require('../../assets/cars/mustang.jpg'), host: 'Jordan', seats: 4, airport: 'Calgary',
    description: 'A comfortable coupe for your next city escape. This classroom listing recreates the saved car in the supplied Turo reference.',
    features: ['Bluetooth', 'Heated seats', 'Backup camera', 'Automatic'] },
  { id: 'hyundai-elantra', name: 'Hyundai Elantra Hybrid', year: 2026, category: 'Hybrid', trim: 'Luxury', efficiency: '4.7 L/100km',
    price: 86, rating: '4.96', trips: 26, image: require('../../assets/cars/elantra.jpg'), host: 'Alex', seats: 5, airport: 'Montreal (YUL)',
    description: 'A modern hybrid sedan with comfortable seating and efficient city driving. This is a demo listing based on the reference screenshot.',
    features: ['Hybrid', 'Bluetooth', 'Heated seats', 'Backup camera', 'Automatic'] },
  { id: 'toyota-highlander', name: 'Toyota Highlander Hybrid', year: 2026, category: 'Hybrid', price: 135, rating: '4.93', trips: 15,
    image: require('../../assets/cars/highlander.jpg'), host: 'Sam', seats: 7, airport: 'Montreal (YUL)',
    description: 'A spacious hybrid SUV for a relaxing weekend. Demo inventory only.', features: ['Hybrid', 'All-wheel drive', 'Bluetooth', 'Automatic'] },
  { id: 'mercedes-glc', name: 'Mercedes-Benz GLC', year: 2026, category: 'SUV', price: 172, rating: '5.00', trips: 12,
    image: require('../../assets/cars/mercedes.jpg'), host: 'Taylor', seats: 5, airport: 'Montreal (YUL)',
    description: 'A comfortable luxury SUV for your next escape. Demo inventory only.', features: ['Bluetooth', 'Heated seats', 'Backup camera', 'Automatic'] },
  { id: 'chevrolet-corvette', name: 'Chevrolet Corvette', year: 2020, category: 'Sports', price: 190, rating: '4.97', trips: 20,
    image: require('../../assets/cars/corvette.jpg'), host: 'Chris', seats: 2, airport: 'Toronto (YYZ)',
    description: 'A striking sports car for a memorable drive. Demo inventory only.', features: ['Bluetooth', 'Backup camera', 'Automatic'] },
  { id: 'bmw-5-series', name: 'BMW 5 Series', year: 2020, category: 'Sedan', price: 145, rating: '5.00', trips: 10,
    image: require('../../assets/cars/bmw.jpg'), host: 'Jamie', seats: 5, airport: 'Toronto (YYZ)',
    description: 'A refined sedan for an enjoyable trip. Demo inventory only.', features: ['Bluetooth', 'Heated seats', 'Automatic'] },
  { id: 'tesla-model-3', name: 'Tesla Model 3', year: 2020, category: 'Electric', price: 74, rating: '4.98', trips: 68,
    image: require('../../assets/cars/tesla.jpg'), host: 'Alex', seats: 5, airport: 'Calgary',
    description: 'Explore Calgary in a quiet, all-electric sedan. Demo inventory only.', features: ['Electric', 'Bluetooth', 'Heated seats', 'Automatic'] },
];
export const findVehicle = (id: string) => vehicles.find(vehicle => vehicle.id === id);
