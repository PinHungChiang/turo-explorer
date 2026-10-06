import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Heading, Icon, Screen } from '../components/UI';
import { useApp } from '../context/AppContext';
type Message = { id: string; text: string; outgoing: boolean };
export function InboxScreen() {
  const { colors } = useApp();
  const [messages, setMessages] = useState<Message[]>([{ id: 'welcome', text: 'Hi! Let me know if you have any questions about your demo trip.', outgoing: false }]);
  const [draft, setDraft] = useState('');
  function send() {
    if (!draft.trim()) return;
    setMessages(current => [...current, { id: String(Date.now()), text: draft.trim(), outgoing: true }]);setDraft('');
  }
  return <Screen><Heading subtitle="Demo conversation with Alex">Inbox</Heading><KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView contentContainerStyle={styles.messages}>{messages.map(message => <View key={message.id} style={[styles.bubble, { backgroundColor: message.outgoing ? colors.primary : colors.surface, alignSelf: message.outgoing ? 'flex-end' : 'flex-start' }]}>
      <Text style={{ color: message.outgoing ? colors.onPrimary : colors.text, lineHeight: 22 }}>{message.text}</Text></View>)}</ScrollView>
    <Text style={{ color: colors.muted, fontSize: 12, paddingHorizontal: 18 }}>Messages stay in this demo screen; they are not sent to anyone.</Text>
    <View style={styles.composer}><TextInput accessibilityLabel="Demo message" placeholder="Write a message" placeholderTextColor={colors.muted} value={draft} onChangeText={setDraft} maxLength={500} style={[styles.input, { color: colors.text, backgroundColor: colors.surface }]} />
      <Pressable accessibilityRole="button" accessibilityLabel="Send demo message" onPress={send} disabled={!draft.trim()} style={[styles.send, { backgroundColor: colors.primary, opacity: draft.trim() ? 1 : 0.5 }]}><Icon name="send-outline" color="white" /></Pressable></View>
  </KeyboardAvoidingView></Screen>;
}
const styles = StyleSheet.create({ messages: { padding: 18, gap: 14 }, bubble: { padding: 15, borderRadius: 15, maxWidth: '85%' }, composer: { flexDirection: 'row', alignItems: 'center', padding: 14, paddingBottom: 100, gap: 10 }, input: { flex: 1, padding: 14, borderRadius: 12, fontSize: 16 }, send: { padding: 14, borderRadius: 12 } });
