import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, ScrollView, Share, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, EmptyState, Icon, Screen, SectionTitle, type IconName } from '../components/UI';
import { useApp } from '../context/AppContext';
import { findVehicle } from '../data/vehicles';
function Spec({ icon, label }: { icon: IconName; label: string }) {
  const { colors } = useApp();
  return <View style={[styles.spec, { backgroundColor: colors.surface }]}><Icon name={icon} size={19} /><Text style={{ color: colors.text, fontSize: 16 }}>{label}</Text></View>;
}
export function VehicleDetailsScreen() {
  const { vehicleId } = useLocalSearchParams<{ vehicleId: string }>();
  const { colors, dark, favorites, toggleFavorite } = useApp();
  const { width } = useWindowDimensions();
  const [notice, setNotice] = useState('');
  const insets = useSafeAreaInsets();
  const vehicle = findVehicle(vehicleId);
  if (!vehicle) return <Screen><EmptyState icon="car-outline" title="Car unavailable" message="Please choose another car." action="Explore cars" onPress={() => router.replace('/')} /></Screen>;
  const saved = favorites.includes(vehicle.id);
  const checkout = () => router.push({ pathname: '/checkout/[vehicleId]', params: { vehicleId: vehicle.id } });
  return <View style={{ flex: 1, backgroundColor: colors.background }}><ScrollView contentContainerStyle={{ paddingBottom: 25 }}>
    <View><Image source={vehicle.image} style={[styles.hero, { height: Math.min(width * 0.84, 420) }]} accessibilityLabel={vehicle.name} />
      <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.canGoBack() ? router.back() : router.replace('/')} style={[styles.back, { top: insets.top + 12 }]}><Icon name="arrow-back" size={27} color="white" /></Pressable>
      <View style={[styles.topActions, { top: insets.top + 12 }]}><Pressable accessibilityRole="button" accessibilityLabel="Share vehicle" onPress={() => { Share.share({ message: `${vehicle.name} in the Turo Explorer classroom demo.` }).catch(() => setNotice('Sharing is unavailable on this device.')); }} style={styles.action}><Icon name="share-outline" size={27} color="white" /></Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel={saved ? 'Remove from favorites' : 'Add to favorites'} accessibilityState={{ selected: saved }} onPress={() => toggleFavorite(vehicle.id)} style={styles.action}><Icon name={saved ? 'heart' : 'heart-outline'} size={27} color={saved ? '#FF4949' : 'white'} /></Pressable></View>
      <View style={styles.imageCount}><Text style={styles.imageCountText}>1 of 1</Text></View>
    </View><View style={styles.body}><Text style={[styles.name, { color: colors.text }]}>{vehicle.name}</Text>
      <View style={styles.rating}><Text style={[styles.subtitle, { color: colors.text }]}>{vehicle.year}{vehicle.trim ? ` ${vehicle.trim}` : ''} · {vehicle.rating}</Text><Icon name="star" size={17} color="#A89AFF" /><Text style={[styles.subtitle, { color: colors.muted }]}>({vehicle.trips} trips)</Text></View>
      <View style={styles.specs}><Spec icon="person-circle-outline" label={`${vehicle.seats} seats`} /><Spec icon="leaf-outline" label={vehicle.category === 'Hybrid' ? 'Hybrid' : vehicle.category === 'Electric' ? 'Electric' : 'Gas'} />
        {vehicle.efficiency && <Spec icon="speedometer-outline" label={vehicle.efficiency} />}<Spec icon="swap-vertical-outline" label="Automatic" /></View>
      <View style={[styles.deal, { backgroundColor: dark ? '#002D25' : '#E1F5EB' }]}><Text style={{ color: colors.text, fontSize: 17, fontWeight: '700' }}>Great deal!</Text><Text style={{ color: colors.text, fontSize: 14, lineHeight: 20, marginTop: 4 }}>Priced lower than similar options for your trip.</Text></View>
      {!!notice && <Text style={{ color: colors.muted, marginTop: 10 }}>{notice}</Text>}
    </View>
    <View style={[styles.trip, { borderColor: colors.surface }]}><SectionTitle>Your trip</SectionTitle><View style={styles.tripRow}><Icon name="calendar-outline" size={26} />
      <View style={{ flex: 1 }}><Text style={[styles.tripLabel, { color: colors.text }]}>Trip dates</Text><Text style={[styles.tripDate, { color: colors.text }]}>Fri, Oct 23 at 10:00 AM</Text><Text style={[styles.tripDate, { color: colors.text }]}>Mon, Oct 26 at 10:00 AM</Text></View>
      <Pressable accessibilityRole="button" accessibilityLabel="Edit trip dates" onPress={checkout} style={[styles.edit, { backgroundColor: colors.surface, borderColor: colors.border }]}><Icon name="pencil-outline" size={25} /></Pressable></View>
      <Text style={{ color: colors.muted, fontSize: 12, marginTop: 14 }}>Reference dates shown. Choose your own dates during checkout.</Text></View>
    <View style={styles.body}><SectionTitle>Description</SectionTitle><Text style={[styles.description, { color: colors.muted }]}>{vehicle.description}</Text>
      <SectionTitle>Features</SectionTitle><View style={styles.features}>{vehicle.features.map(feature => <View key={feature} style={styles.feature}><Icon name="checkmark-circle-outline" size={20} color={colors.primary} /><Text style={{ color: colors.text }}>{feature}</Text></View>)}</View>
      <SectionTitle>Hosted by {vehicle.host}</SectionTitle><Text style={{ color: colors.muted }}>Demo All-Star Host · {vehicle.airport}</Text>
    </View></ScrollView>
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12), backgroundColor: dark ? '#111111' : colors.surface, borderColor: colors.border }]}><View style={{ flex: 1 }}>
      <Text style={[styles.total, { color: colors.text }]}>CA${vehicle.price * 3} total</Text><Text style={{ color: colors.muted, marginTop: 6, fontSize: 14 }}>Before taxes</Text></View><Button title="Continue" onPress={checkout} /></View>
  </View>;
}
const styles = StyleSheet.create({ hero: { width: '100%', resizeMode: 'cover' }, back: { position: 'absolute', left: 17, padding: 11, borderRadius: 28, backgroundColor: '#54545CB8' }, topActions: { position: 'absolute', right: 17, flexDirection: 'row', borderRadius: 28, backgroundColor: '#54545CB8' }, action: { padding: 11 },
  imageCount: { position: 'absolute', left: 14, bottom: 14, backgroundColor: '#242424E6', borderRadius: 5, paddingHorizontal: 8, paddingVertical: 4 }, imageCountText: { color: 'white', fontWeight: '600', fontSize: 14 },
  body: { paddingHorizontal: 14, paddingVertical: 22 }, name: { fontSize: 23, fontWeight: '800', letterSpacing: -0.4 }, rating: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 3, marginTop: 7 }, subtitle: { fontSize: 17 },
  specs: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 17 }, spec: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 8, paddingVertical: 8, borderRadius: 4 }, deal: { padding: 12, borderRadius: 11, marginTop: 18 },
  trip: { borderTopWidth: 8, paddingHorizontal: 14, paddingVertical: 23 }, tripRow: { flexDirection: 'row', alignItems: 'center', gap: 16 }, tripLabel: { fontSize: 18, fontWeight: '700', marginBottom: 5 }, tripDate: { fontSize: 15, marginBottom: 3 }, edit: { borderWidth: 1, padding: 9, borderRadius: 9 },
  description: { fontSize: 16, lineHeight: 25, marginBottom: 25 }, features: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, marginBottom: 25 }, feature: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  footer: { borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, paddingTop: 12, gap: 12 }, total: { fontSize: 18, fontWeight: '700', textDecorationLine: 'underline' } });
