import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ComponentProps, ReactNode } from 'react';
import { useApp } from '../context/AppContext';
export type IconName = ComponentProps<typeof Ionicons>['name'];
export function Icon({ name, size = 22, color }: { name: IconName; size?: number; color?: string }) {
  const { colors } = useApp();
  return <Ionicons accessible={false} name={name} size={size} color={color ?? colors.text} />;
}
export function Screen({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  const { colors } = useApp();
  return <SafeAreaView edges={['top', 'left', 'right']} style={[styles.screen, { backgroundColor: colors.background }, style]}>{children}</SafeAreaView>;
}
export function Heading({ children, subtitle }: { children: ReactNode; subtitle?: string }) {
  const { colors } = useApp();
  return <View style={styles.heading}><Text style={[styles.title, { color: colors.text }]}>{children}</Text>
    {subtitle && <Text style={[styles.subtitle, { color: colors.muted }]}>{subtitle}</Text>}</View>;
}
export function Button({ title, onPress, secondary = false, disabled = false }: {
  title: string; onPress: () => void; secondary?: boolean; disabled?: boolean;
}) {
  const { colors } = useApp();
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress}
    style={({ pressed }) => [styles.button, { backgroundColor: secondary ? colors.surface : colors.primary, opacity: disabled ? 0.45 : pressed ? 0.75 : 1 }]}>
    <Text style={[styles.buttonText, { color: secondary ? colors.text : colors.onPrimary }]}>{title}</Text></Pressable>;
}
export function EmptyState({ icon, title, message, action, onPress }: {
  icon: IconName; title: string; message: string; action?: string; onPress?: () => void;
}) {
  const { colors } = useApp();
  return <View style={styles.empty}><View style={[styles.emptyIcon, { backgroundColor: colors.accent }]}><Icon name={icon} size={36} color={colors.primary} /></View>
    <Text style={[styles.emptyTitle, { color: colors.text }]}>{title}</Text><Text style={[styles.emptyMessage, { color: colors.muted }]}>{message}</Text>
    {action && onPress && <Button title={action} onPress={onPress} />}</View>;
}
export function SectionTitle({ children }: { children: ReactNode }) {
  const { colors } = useApp();
  return <Text style={[styles.sectionTitle, { color: colors.text }]}>{children}</Text>;
}
const styles = StyleSheet.create({
  screen: { flex: 1 }, heading: { paddingHorizontal: 24, paddingTop: 18, paddingBottom: 20 },
  title: { fontSize: 30, fontWeight: '800', letterSpacing: -0.8 }, subtitle: { fontSize: 15, lineHeight: 22, marginTop: 6 },
  button: { paddingVertical: 16, paddingHorizontal: 20, borderRadius: 10, alignItems: 'center' }, buttonText: { fontSize: 16, fontWeight: '700' },
  empty: { padding: 30, flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
  emptyIcon: { width: 84, height: 84, borderRadius: 42, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 23, fontWeight: '700', textAlign: 'center' }, emptyMessage: { fontSize: 16, lineHeight: 24, textAlign: 'center', marginBottom: 8 },
  sectionTitle: { fontSize: 21, fontWeight: '700', marginBottom: 16 },
});
