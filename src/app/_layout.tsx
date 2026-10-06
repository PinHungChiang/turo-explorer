import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router/react-navigation';
import { AppProvider, useApp } from '../context/AppContext';
function RootNavigation() {
  const { colors, dark, ready } = useApp();
  if (!ready) return <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center' }}><ActivityIndicator color={colors.primary} /></View>;
  const base = dark ? DarkTheme : DefaultTheme;
  return <ThemeProvider value={{ ...base, colors: { ...base.colors, background: colors.background, card: colors.background, text: colors.text, primary: colors.primary, border: colors.border } }}>
    <StatusBar style={dark ? 'light' : 'dark'} /><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background }, animation: 'slide_from_right' }}>
      <Stack.Screen name="(tabs)" /><Stack.Screen name="vehicle/[vehicleId]" /><Stack.Screen name="checkout/[vehicleId]" />
    </Stack></ThemeProvider>;
}
export default function RootLayout() { return <AppProvider><RootNavigation /></AppProvider>; }
