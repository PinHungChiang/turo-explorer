import { StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { money, quote } from '../utils/booking';
export function PriceSummary({ dailyPrice, days }: { dailyPrice: number; days: number }) {
  const { colors } = useApp();
  const cost = quote(dailyPrice, days);
  const rows = [
    { id: 'rental', label: `${money(dailyPrice)} × ${days} ${days === 1 ? 'day' : 'days'}`, value: cost.subtotal },
    { id: 'fee', label: 'Demo trip fee', value: cost.fee }, { id: 'tax', label: 'Demo tax (5%)', value: cost.tax },
  ];
  return <View>{rows.map(row => <View key={row.id} style={styles.row}><Text style={{ color: colors.muted }}>{row.label}</Text><Text style={{ color: colors.text }}>{money(row.value)}</Text></View>)}
    <View style={[styles.total, { borderColor: colors.border }]}><Text style={[styles.bold, { color: colors.text }]}>Total (CAD)</Text><Text style={[styles.bold, { color: colors.text }]}>{money(cost.total)}</Text></View></View>;
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, paddingVertical: 10 },
  total: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, paddingTop: 18, marginTop: 8 }, bold: { fontSize: 20, fontWeight: '700' } });
