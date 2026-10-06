import { useState } from 'react';
import { router } from 'expo-router';
import { FlatList, Image, Pressable, Share, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Screen, EmptyState, Icon } from '../components/UI';
import { useApp } from '../context/AppContext';
import { vehicles } from '../data/vehicles';
export function FavoritesScreen() {
  const { favorites, colors, toggleFavorite } = useApp();
  const { width } = useWindowDimensions();
  const [settings, setSettings] = useState(false);
  const [notice, setNotice] = useState('');
  const saved = vehicles.filter(vehicle => favorites.includes(vehicle.id));
  return <Screen><FlatList data={saved} keyExtractor={item => item.id} contentContainerStyle={styles.content}
    ListHeaderComponent={<>
      <View style={styles.toolbar}><Pressable accessibilityRole="button" accessibilityLabel="Back to search" onPress={() => router.navigate('/')} style={[styles.circle, { backgroundColor: colors.surface }]}><Icon name="arrow-back" size={26} /></Pressable>
        <View style={[styles.actions, { backgroundColor: colors.surface }]}><Pressable accessibilityRole="button" accessibilityLabel="Share favorites" onPress={() => { Share.share({ message: 'My Calgary favorite cars in the Turo Explorer classroom demo.' }).catch(() => setNotice('Sharing is unavailable on this device.')); }} style={styles.action}><Icon name="share-outline" size={26} /></Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel="Favorite list settings" onPress={() => setSettings(value => !value)} style={styles.action}><Icon name="settings-outline" size={26} /></Pressable></View></View>
      <Text style={[styles.title, { color: colors.text }]}>Calgary</Text><Text style={[styles.count, { color: colors.text }]}>{saved.length} {saved.length === 1 ? 'vehicle' : 'vehicles'}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel="Add trip dates" onPress={() => saved[0] ? router.push({ pathname: '/checkout/[vehicleId]', params: { vehicleId: saved[0].id } }) : setNotice('Save a vehicle first to choose trip dates.')}
        style={[styles.dates, { borderColor: colors.border, backgroundColor: colors.surface }]}><Icon name="calendar-outline" size={21} /><Text style={{ color: colors.text, fontSize: 17, fontWeight: '600' }}>Add trip dates</Text></Pressable>
      {settings && <View style={styles.settings}><Text style={{ color: colors.muted }}>Tap a car’s heart to remove it from this list.</Text><Pressable accessibilityRole="button" accessibilityLabel="Close settings" onPress={() => setSettings(false)}><Icon name="close-outline" /></Pressable></View>}
      {!!notice && <Text style={{ color: colors.muted, marginTop: 12 }}>{notice}</Text>}
      <View style={{ height: 23 }} />
    </>}
    renderItem={({ item }) => <View style={[styles.card, { borderColor: colors.border, backgroundColor: colors.surface }]}>
      <Pressable accessibilityRole="button" accessibilityLabel={`View ${item.name}`} onPress={() => router.push({ pathname: '/vehicle/[vehicleId]', params: { vehicleId: item.id } })}>
        <Image source={item.image} style={[styles.photo, { height: (width - 30) / 1.77 }]} /><View style={styles.body}><Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
          <View style={styles.rating}><Text style={[styles.info, { color: colors.text }]}>{item.year} · {item.rating}</Text><Icon name="star" size={16} color="#A89AFF" /><Text style={[styles.info, { color: colors.muted }]}>({item.trips})</Text></View>
          <Text style={[styles.details, { color: colors.text }]}>View details</Text></View></Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel={`Remove ${item.name} from favorites`} onPress={() => toggleFavorite(item.id)} style={[styles.heart, { backgroundColor: colors.surface }]}><Icon name="heart" color="#FF4949" size={22} /></Pressable>
    </View>}
    ListEmptyComponent={<EmptyState icon="heart-outline" title="Your favorites start here" message="Tap a heart on a car to save it for later." action="Explore cars" onPress={() => router.navigate('/')} />} /></Screen>;
}
const styles = StyleSheet.create({ content: { paddingHorizontal: 14, paddingBottom: 115 }, toolbar: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, marginBottom: 25 }, circle: { padding: 11, borderRadius: 30 }, actions: { flexDirection: 'row', borderRadius: 30 }, action: { padding: 11 },
  title: { fontSize: 33, fontWeight: '800', letterSpacing: -0.6 }, count: { fontSize: 17, marginTop: 8 }, dates: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 10, borderWidth: 1, borderRadius: 10, paddingHorizontal: 11, paddingVertical: 8, marginTop: 7 },
  card: { borderWidth: 1, borderRadius: 13, overflow: 'hidden', marginBottom: 20 }, photo: { width: '100%', aspectRatio: 1.77 }, body: { padding: 14 }, name: { fontSize: 23, fontWeight: '800' }, rating: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 5 }, info: { fontSize: 17 }, details: { fontSize: 17, fontWeight: '700', textAlign: 'right', marginTop: 34, marginBottom: 3 }, heart: { position: 'absolute', right: 7, top: 7, padding: 8, borderRadius: 10 }, settings: { flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 15 } });
