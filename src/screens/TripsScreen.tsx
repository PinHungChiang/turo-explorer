import { FlatList } from 'react-native';
import { router } from 'expo-router';
import { Screen, Heading, EmptyState } from '../components/UI';
import { BookingCard } from '../components/BookingCard';
import { useApp } from '../context/AppContext';
export function TripsScreen() {
  const { bookings } = useApp();
  return <Screen><Heading subtitle="Your next adventure is waiting.">Trips</Heading>
    {bookings.length ? <FlatList data={bookings} keyExtractor={booking => booking.id} contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 115 }}
      renderItem={({ item }) => <BookingCard booking={item} onView={vehicleId => router.push({ pathname: '/vehicle/[vehicleId]', params: { vehicleId } })} />} /> :
      <EmptyState icon="car-sport-outline" title="Where will you go next?" message="Find a car you love and book a demo trip. It will appear here." action="Find a car" onPress={() => router.navigate('/')} />}</Screen>;
}
