import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '../context/AppContext';
import type { Vehicle } from '../types';
import { Icon } from './UI';
export function RecommendationCard({ vehicle, compact = false, showHeart = false }: { vehicle: Vehicle; compact?: boolean; showHeart?: boolean }) {
  const { colors, favorites, toggleFavorite } = useApp();
  const open = () => router.push({ pathname: '/vehicle/[vehicleId]', params: { vehicleId: vehicle.id } });
  const saved = favorites.includes(vehicle.id);
  if (compact) return <Pressable accessibilityRole="button" accessibilityLabel={`View ${vehicle.name}`} onPress={open} style={[styles.recent, { backgroundColor: colors.surface }]}>
    <Image source={vehicle.image} style={styles.recentPhoto} /><View style={{ flex: 1 }}><Text numberOfLines={1} style={[styles.recentName, { color: colors.text }]}>{vehicle.name}</Text>
      <View style={styles.rating}><Text style={{ color: colors.text, fontSize: 16 }}>{vehicle.year} · {vehicle.rating}</Text><Icon name="star" size={14} color="#A89AFF" /><Text style={{ color: colors.muted }}>({vehicle.trips})</Text></View></View></Pressable>;
  return <View style={styles.card}><Pressable accessibilityRole="button" accessibilityLabel={`View ${vehicle.name}`} onPress={open}>
    <Image source={vehicle.image} style={styles.photo} /><Text numberOfLines={2} style={[styles.name, { color: colors.text }]}>{vehicle.name}</Text>
    <View style={styles.rating}><Text style={{ color: colors.text, fontSize: 15 }}>{vehicle.year} · {vehicle.rating}</Text><Icon name="star" size={14} color="#A89AFF" /><Text style={{ color: colors.muted }}>({vehicle.trips})</Text></View>
    <Text style={[styles.price, { color: colors.text }]}>CA${vehicle.price}/day</Text><Text style={{ color: colors.muted, fontSize: 14 }}>CA${vehicle.price * 3} total</Text>
  </Pressable>{showHeart && <Pressable accessibilityRole="button" accessibilityLabel={`${saved ? 'Remove' : 'Add'} ${vehicle.name} ${saved ? 'from' : 'to'} favorites`}
    onPress={() => toggleFavorite(vehicle.id)} style={styles.heart}><Icon name={saved ? 'heart' : 'heart-outline'} size={24} color={saved ? '#FF4B4B' : '#EEEEEE'} /></Pressable>}</View>;
}
const styles = StyleSheet.create({ card: { width: 140, marginRight: 11 }, photo: { width: 140, height: 94, borderRadius: 12 }, name: { fontSize: 17, fontWeight: '700', marginTop: 10, lineHeight: 21 },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 3 }, price: { fontSize: 16, fontWeight: '700', marginTop: 6 }, heart: { position: 'absolute', top: 9, right: 9 },
  recent: { flexDirection: 'row', alignItems: 'center', width: 298, padding: 10, borderRadius: 12, marginRight: 12, gap: 10 }, recentPhoto: { width: 107, height: 72, borderRadius: 8 }, recentName: { fontSize: 18, fontWeight: '700' } });
