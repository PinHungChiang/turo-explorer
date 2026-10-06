import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from './UI';
import { useApp } from '../context/AppContext';
import type { Vehicle } from '../types';
import { money } from '../utils/booking';
type VehicleCardProps = { vehicle: Vehicle; onPress: () => void };
export function VehicleCard({ vehicle, onPress }: VehicleCardProps) {
  const { colors, favorites, toggleFavorite } = useApp();
  const saved = favorites.includes(vehicle.id);
  return <View style={[styles.card, { borderColor: colors.border, backgroundColor: colors.background }]}>
    <Pressable accessibilityRole="button" accessibilityLabel={`View ${vehicle.name}`} onPress={onPress}>
      <Image source={vehicle.image} style={styles.photo} accessibilityLabel={vehicle.name} />
      <View style={styles.content}><Text style={[styles.name, { color: colors.text }]}>{vehicle.name} {vehicle.year}</Text>
        <View style={styles.row}><Icon name="star" size={14} color={colors.primary} /><Text style={[styles.rating, { color: colors.text }]}>{vehicle.rating}</Text>
          <Text style={{ color: colors.muted }}>({vehicle.trips} trips)</Text><View style={styles.spacer} />
          <Text style={[styles.price, { color: colors.text }]}>{money(vehicle.price)}</Text><Text style={{ color: colors.muted }}>/day</Text></View>
        <View style={[styles.row, { marginTop: 10 }]}><Icon name="ribbon-outline" size={15} color={colors.muted} /><Text style={[styles.small, { color: colors.muted }]}>All-Star Host</Text>
          <View style={styles.spacer} /><Text style={[styles.small, { color: colors.muted }]}>Calgary, AB</Text></View>
      </View></Pressable>
    <Pressable accessibilityRole="button" accessibilityLabel={`${saved ? 'Remove' : 'Add'} ${vehicle.name} ${saved ? 'from' : 'to'} favorites`}
      accessibilityState={{ selected: saved }} onPress={() => toggleFavorite(vehicle.id)} style={({ pressed }) => [styles.favorite, { opacity: pressed ? 0.7 : 1 }]}>
      <Icon name={saved ? 'heart' : 'heart-outline'} size={24} color={saved ? '#593CFB' : '#231F20'} /></Pressable>
  </View>;
}
const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 14, overflow: 'hidden', marginBottom: 20 }, photo: { width: '100%', height: 210, resizeMode: 'cover' },
  content: { padding: 16 }, name: { fontSize: 21, fontWeight: '700', marginBottom: 10 }, row: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 5 },
  rating: { fontWeight: '700', fontSize: 14 }, price: { fontWeight: '800', fontSize: 16 }, spacer: { flex: 1 }, small: { fontSize: 12 },
  favorite: { position: 'absolute', top: 14, right: 14, backgroundColor: 'white', borderRadius: 24, padding: 10 },
});
