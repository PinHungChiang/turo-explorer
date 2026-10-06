import { useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Button, EmptyState, Icon, Screen, SectionTitle } from '../components/UI';
import { PriceSummary } from '../components/PriceSummary';
import { useApp } from '../context/AppContext';
import { findVehicle } from '../data/vehicles';
import { quote, tomorrow, validStartDate } from '../utils/booking';
export function CheckoutScreen() {
  const { vehicleId } = useLocalSearchParams<{ vehicleId: string }>();
  const { colors, addBooking } = useApp();
  const insets = useSafeAreaInsets();
  const [startDate, setStartDate] = useState(tomorrow);
  const [days, setDays] = useState(3);
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const submitted = useRef(false);
  const vehicle = findVehicle(vehicleId);
  if (!vehicle) return <Screen><EmptyState icon="car-outline" title="Car unavailable" message="Please choose another car." action="Go back" onPress={() => router.canGoBack() ? router.back() : router.replace('/')} /></Screen>;
  function confirmBooking() {
    if (submitted.current || !vehicle) return;
    if (!validStartDate(startDate)) { setError('Enter a valid date today or later using YYYY-MM-DD.'); return; }
    submitted.current = true;
    addBooking({ vehicleId: vehicle.id, startDate, days, total: quote(vehicle.price, days).total });
    setConfirmed(true);
  }
  if (confirmed) return <Screen><EmptyState icon="checkmark-circle-outline" title="Your demo trip is booked!"
    message={`${vehicle.name} · ${startDate} · ${days} days. No payment was taken.`} action="View my trips"
    onPress={() => { router.dismissAll(); router.replace('/trips'); }} /></Screen>;
  return <Screen><KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <View style={styles.header}><Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.canGoBack() ? router.back() : router.replace('/')} style={styles.back}><Icon name="arrow-back" /></Pressable><Text style={[styles.title, { color: colors.text }]}>Book your trip</Text></View>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 16) }]}>
      <View style={[styles.car, { borderColor: colors.border }]}><Image source={vehicle.image} style={styles.photo} /><View style={{ flex: 1 }}><Text style={[styles.carName, { color: colors.text }]}>{vehicle.name}</Text><Text style={{ color: colors.muted, marginTop: 5 }}>{vehicle.year} · Calgary, AB</Text></View></View>
      <SectionTitle>Your dates</SectionTitle><Text style={[styles.label, { color: colors.muted }]}>Trip start (YYYY-MM-DD)</Text>
      <TextInput accessibilityLabel="Trip start date" placeholder="YYYY-MM-DD" placeholderTextColor={colors.muted} value={startDate} onChangeText={value => { setStartDate(value); setError(''); }}
        autoCapitalize="none" maxLength={10} style={[styles.input, { borderColor: error ? '#C84343' : colors.border, color: colors.text, backgroundColor: colors.surface }]} />
      {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
      <View style={styles.duration}><Text style={{ color: colors.text, fontSize: 16, fontWeight: '600' }}>Trip duration</Text><View style={styles.stepper}>
        <Pressable accessibilityRole="button" accessibilityLabel="Decrease trip duration" disabled={days === 1} onPress={() => setDays(value => Math.max(1, value - 1))} style={[styles.step, { backgroundColor: colors.surface, opacity: days === 1 ? 0.4 : 1 }]}><Icon name="remove" /></Pressable>
        <Text style={{ color: colors.text, fontWeight: '700', minWidth: 55, textAlign: 'center' }}>{days} days</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Increase trip duration" disabled={days === 14} onPress={() => setDays(value => Math.min(14, value + 1))} style={[styles.step, { backgroundColor: colors.surface, opacity: days === 14 ? 0.4 : 1 }]}><Icon name="add" /></Pressable></View></View>
      <SectionTitle>Price details</SectionTitle><PriceSummary dailyPrice={vehicle.price} days={days} />
      <Text style={[styles.notice, { color: colors.muted }]}>This is a classroom demo. Booking creates a local trip only; no payment or real reservation is made.</Text>
      <Button title="Confirm demo booking" onPress={confirmBooking} />
    </ScrollView></KeyboardAvoidingView></Screen>;
}
const styles = StyleSheet.create({ header: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16 }, back: { padding: 10 }, title: { fontSize: 24, fontWeight: '800' },
  content: { paddingHorizontal: 24 }, car: { flexDirection: 'row', alignItems: 'center', paddingBottom: 24, borderBottomWidth: 1, gap: 16, marginBottom: 24 }, photo: { width: 110, height: 80, borderRadius: 10 },
  carName: { fontSize: 20, fontWeight: '700' }, label: { fontSize: 13, marginBottom: 8 }, input: { borderWidth: 1, borderRadius: 10, padding: 16, fontSize: 16 }, error: { color: '#C84343', marginTop: 8, lineHeight: 20 },
  duration: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between', marginVertical: 26 }, stepper: { flexDirection: 'row', alignItems: 'center', gap: 10 }, step: { padding: 10, borderRadius: 10 },
  notice: { fontSize: 13, lineHeight: 20, marginVertical: 24 } });
