import { useState } from 'react';
import { router } from 'expo-router';
import { ScrollView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { vehicles } from '../data/vehicles';
import { VehicleCard } from '../components/VehicleCard';
import { RecommendationCard } from '../components/RecommendationCard';
import { EmptyState, Icon, Screen, type IconName } from '../components/UI';
const modes: { label: string; icon: IconName }[] = [
  { label: 'All', icon: 'car' }, { label: 'Airports', icon: 'airplane' },
  { label: 'Monthly', icon: 'calendar-outline' }, { label: 'Nearby', icon: 'location' },
];
// One-screen section helper; reusable card remains in its own file.
function RecommendationSection({ title, ids, hearts = false }: { title: string; ids: string[]; hearts?: boolean }) {
  const { colors } = useApp();
  return <View style={styles.section}><Text style={[styles.sectionTitle, { color: colors.text, paddingHorizontal: 14 }]}>{title}</Text>
    <Text style={[styles.subtitle, { color: colors.muted }]}>Average daily prices for a 3-day trip</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontal}>
      {ids.map(id => { const vehicle = vehicles.find(item => item.id === id); return vehicle ? <RecommendationCard key={id} vehicle={vehicle} showHeart={hearts} /> : null; })}
    </ScrollView></View>;
}
export function SearchScreen() {
  const { colors, dark } = useApp();
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('All');
  const [budget, setBudget] = useState(false);
  const filtering = query.trim().length > 0 || mode !== 'All' || budget;
  const matches = vehicles.filter(vehicle => `${vehicle.name} ${vehicle.airport}`.toLowerCase().includes(query.trim().toLowerCase()) &&
    (mode !== 'Nearby' || vehicle.airport === 'Calgary') && (mode !== 'Airports' || vehicle.airport?.includes('(')) && (!budget || vehicle.price <= 90));
  return <Screen><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 115 }}>
    <View style={[styles.top, { backgroundColor: dark ? '#111111' : colors.background, borderColor: colors.border }]}>
      <View style={[styles.search, { backgroundColor: dark ? '#1F1F1F' : colors.surface, borderColor: colors.border }]}>
        <TextInput accessibilityLabel="Search cars or location" placeholder="Search anywhere" placeholderTextColor={colors.muted} value={query} onChangeText={setQuery} style={[styles.input, { color: colors.text }]} />
        <Pressable accessibilityRole="button" accessibilityLabel={query ? 'Clear search' : 'Search nearby cars'} onPress={() => query ? setQuery('') : setMode('Nearby')}
          style={[styles.searchButton, { backgroundColor: colors.primary }]}><Icon name={query ? 'close-outline' : 'search-outline'} size={27} color="white" /></Pressable>
      </View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.modeRow}>
        {modes.map(item => <Pressable key={item.label} accessibilityRole="button" accessibilityLabel={item.label} accessibilityState={{ selected: mode === item.label }} onPress={() => setMode(item.label)}
          style={[styles.mode, { backgroundColor: mode === item.label ? colors.text : 'transparent' }]}>
          <Icon name={item.icon} size={18} color={mode === item.label ? colors.background : colors.muted} /><Text style={{ fontSize: 17, fontWeight: mode === item.label ? '600' : '400', color: mode === item.label ? colors.background : colors.muted }}>{item.label}</Text></Pressable>)}
      </ScrollView></View>
    {filtering ? <View style={styles.results}><View style={styles.resultsHeader}><Text style={[styles.sectionTitle, { color: colors.text }]}>{matches.length} {matches.length === 1 ? 'car' : 'cars'} found</Text>
      <Pressable accessibilityRole="button" accessibilityLabel="Filter cars at 90 dollars or less per day" onPress={() => setBudget(value => !value)} style={[styles.budget, { borderColor: colors.border }]}><Text style={{ color: colors.text }}>{budget ? 'All prices' : 'Under $90'}</Text></Pressable></View>
      {mode === 'Monthly' && <Text style={{ color: colors.muted, marginBottom: 14 }}>Choose your trip length on the booking screen. These are demo daily rates.</Text>}
      {matches.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} onPress={() => router.push({ pathname: '/vehicle/[vehicleId]', params: { vehicleId: vehicle.id } })} />)}
      {!matches.length && <EmptyState icon="search-outline" title="No cars found" message="Try a different car name or location." action="Reset filters" onPress={() => { setQuery(''); setMode('All'); setBudget(false); }} />}
    </View> : <>
      <Text style={[styles.recentTitle, { color: colors.text }]}>Inspired by your recent searches</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontal}>
        {['ford-mustang', 'tesla-model-3'].map(id => <RecommendationCard key={id} vehicle={vehicles.find(item => item.id === id)!} compact />)}
      </ScrollView>
      <RecommendationSection title="Newer car rental at Montreal (YUL) airport" ids={['hyundai-elantra', 'toyota-highlander', 'mercedes-glc']} />
      <RecommendationSection title="Luxury car rental at Toronto (YYZ) airport" ids={['chevrolet-corvette', 'bmw-5-series', 'mercedes-glc']} hearts />
      <Text style={[styles.demo, { color: colors.muted }]}>Classroom demo · No real reservations</Text>
    </>}
  </ScrollView></Screen>;
}
const styles = StyleSheet.create({ top: { paddingTop: 32, paddingBottom: 14, borderBottomWidth: 1 }, search: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, marginHorizontal: 14, borderRadius: 12, padding: 7 },
  input: { flex: 1, height: 35, fontSize: 17, paddingLeft: 7 }, searchButton: { width: 36, height: 36, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  modeRow: { paddingHorizontal: 14, gap: 8, paddingTop: 11 }, mode: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 15, paddingVertical: 9, borderRadius: 8 },
  horizontal: { paddingLeft: 14, paddingRight: 14 }, recentTitle: { paddingHorizontal: 14, fontSize: 17, fontWeight: '700', marginTop: 7, marginBottom: 11 },
  section: { marginTop: 27 }, sectionTitle: { fontSize: 15, fontWeight: '700', lineHeight: 20, letterSpacing: -0.3 }, subtitle: { fontSize: 14, marginTop: 4, marginBottom: 10, paddingHorizontal: 14 },
  recent: { marginBottom: 20 }, results: { padding: 14 }, resultsHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }, budget: { borderWidth: 1, borderRadius: 8, padding: 8 }, demo: { fontSize: 12, textAlign: 'center', marginTop: 25 },
});
