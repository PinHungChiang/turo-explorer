import type { ImageSourcePropType } from 'react-native';
export type Category = 'All' | 'Electric' | 'SUV' | 'Sports' | 'Hybrid' | 'Sedan';
export type Vehicle = {
  id: string; name: string; year: number; category: Exclude<Category, 'All'>;
  price: number; rating: string; trips: number; image: ImageSourcePropType;
  host: string; seats: number; description: string; features: string[];
  trim?: string; efficiency?: string; airport?: string;
};
export type Booking = { id: string; vehicleId: string; startDate: string; days: number; total: number };
export type Profile = { name: string; email: string };
