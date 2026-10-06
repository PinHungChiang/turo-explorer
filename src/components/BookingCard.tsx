import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { findVehicle } from '../data/vehicles';
import type { Booking } from '../types';
import { money } from '../utils/booking';
import { Button, Icon } from './UI';
export function BookingCard({ booking, onView }: { booking: Booking; onView: (vehicleId: string) => void }) {
  const { colors, cancelBooking } = useApp();
  const [confirmCancel, setConfirmCancel] = useState(false);
  const vehicle = findVehicle(booking.vehicleId);
  if (!vehicle) return null;
  return <View style={[styles.card, { borderColor: colors.border }]}><Image source={vehicle.image} style={styles.image} />
    <View style={styles.body}><Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700' }}>DEMO BOOKING</Text><Text style={[styles.title, { color: colors.text }]}>{vehicle.name} {vehicle.year}</Text>
      <View style={styles.row}><Icon name="calendar-outline" size={18} color={colors.muted} /><Text style={{ color: colors.muted }}>{booking.startDate} · {booking.days} days</Text></View>
      <Text style={[styles.total, { color: colors.text }]}>Total: {money(booking.total)}</Text>
      {confirmCancel ? <><Text style={{ color: colors.text, marginBottom: 12 }}>Cancel this demo trip?</Text><Button title="Yes, cancel trip" secondary onPress={() => cancelBooking(booking.id)} />
        <Button title="Keep trip" onPress={() => setConfirmCancel(false)} /></> : <><Button title="View car" onPress={() => onView(vehicle.id)} /><Button title="Cancel trip" secondary onPress={() => setConfirmCancel(true)} /></>}
    </View></View>;
}
const styles = StyleSheet.create({ card: { borderRadius: 14, borderWidth: 1, overflow: 'hidden', marginBottom: 20 }, image: { width: '100%', height: 180 }, body: { padding: 18, gap: 10 },
  title: { fontSize: 22, fontWeight: '700' }, row: { flexDirection: 'row', alignItems: 'center', gap: 8 }, total: { fontSize: 16, fontWeight: '600', marginBottom: 8 } });
