import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Heading, Icon, Screen, SectionTitle } from '../components/UI';
import { useApp } from '../context/AppContext';
export function ProfileScreen() {
  const { colors, dark, toggleTheme, profile, updateProfile, favorites, bookings, storageError } = useApp();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [message, setMessage] = useState('');
  const insets = useSafeAreaInsets();
  function saveProfile() {
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setMessage('Enter a name and a valid email address.'); return; }
    updateProfile({ name: name.trim(), email: email.trim() }); setEditing(false); setMessage('Profile saved.');
  }
  return <Screen><KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 20) + 100 }}>
    <Heading subtitle="A little about you.">More</Heading><View style={styles.content}>
      <View style={styles.person}><View style={[styles.avatar, { backgroundColor: colors.accent }]}><Text style={{ color: colors.primary, fontSize: 35, fontWeight: '700' }}>{profile.name.charAt(0).toUpperCase()}</Text></View>
        <Text style={[styles.name, { color: colors.text }]}>{profile.name}</Text><Text style={{ color: colors.muted }}>{profile.email}</Text><Text style={{ color: colors.primary, marginTop: 8, fontWeight: '600' }}>Demo traveler</Text></View>
      <View style={[styles.stats, { backgroundColor: colors.surface }]}><View style={styles.stat}><Text style={[styles.number, { color: colors.text }]}>{favorites.length}</Text><Text style={{ color: colors.muted }}>Favorites</Text></View><View style={styles.stat}><Text style={[styles.number, { color: colors.text }]}>{bookings.length}</Text><Text style={{ color: colors.muted }}>Trips</Text></View></View>
      {editing ? <View style={styles.editor}><Text style={{ color: colors.text }}>Name</Text><TextInput accessibilityLabel="Profile name" value={name} onChangeText={setName} maxLength={40} style={[styles.input, { color: colors.text, borderColor: colors.border }]} />
        <Text style={{ color: colors.text }}>Email</Text><TextInput accessibilityLabel="Profile email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" maxLength={100} style={[styles.input, { color: colors.text, borderColor: colors.border }]} />
        <Button title="Save profile" onPress={saveProfile} /><Button title="Cancel editing" secondary onPress={() => { setEditing(false); setMessage(''); }} /></View> :
        <Button title="Edit profile" secondary onPress={() => { setName(profile.name); setEmail(profile.email); setEditing(true); setMessage(''); }} />}
      {!!message && <Text accessibilityRole="alert" style={{ color: colors.text, marginTop: 12 }}>{message}</Text>}
      <View style={styles.preferences}><SectionTitle>Preferences</SectionTitle><View style={[styles.themeRow, { borderColor: colors.border }]}><Icon name="moon-outline" /><Text style={{ color: colors.text, flex: 1, fontSize: 16 }}>Dark mode</Text><Switch accessibilityLabel="Dark mode" value={dark} onValueChange={toggleTheme} trackColor={{ false: '#C9C4CE', true: colors.primary }} /></View></View>
      <SectionTitle>About this app</SectionTitle><Text style={[styles.about, { color: colors.muted }]}>Turo Explorer is an educational interface recreation. Cars, hosts, ratings and bookings are fictional. Your preferences are stored only on this device.</Text>
      {!!storageError && <Text accessibilityRole="alert" style={{ color: colors.muted, marginTop: 12 }}>{storageError}</Text>}
    </View></ScrollView></KeyboardAvoidingView></Screen>;
}
const styles = StyleSheet.create({ content: { paddingHorizontal: 24 }, person: { alignItems: 'center', paddingVertical: 12, marginBottom: 22 }, avatar: { width: 90, height: 90, borderRadius: 45, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  name: { fontSize: 26, fontWeight: '800', marginBottom: 8 }, stats: { flexDirection: 'row', borderRadius: 12, padding: 20, marginBottom: 20 }, stat: { flex: 1, alignItems: 'center', gap: 6 }, number: { fontSize: 27, fontWeight: '800' },
  editor: { gap: 10 }, input: { borderWidth: 1, borderRadius: 8, padding: 14, fontSize: 16 }, preferences: { marginTop: 30, marginBottom: 28 }, themeRow: { flexDirection: 'row', alignItems: 'center', gap: 14, borderBottomWidth: 1, paddingBottom: 18 }, about: { fontSize: 14, lineHeight: 23 } });
