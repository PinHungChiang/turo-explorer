import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkColors, lightColors, type Colors } from '../theme';
import type { Booking, Profile } from '../types';
type AppState = {
  dark: boolean; colors: Colors; ready: boolean; storageError: string;
  favorites: string[]; bookings: Booking[]; profile: Profile;
  toggleTheme: () => void; toggleFavorite: (id: string) => void;
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  cancelBooking: (id: string) => void; updateProfile: (profile: Profile) => void;
};
const AppContext = createContext<AppState | undefined>(undefined);
const STORAGE_KEY = 'turo-explorer-v2';
export function AppProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(true);
  const [favorites, setFavorites] = useState<string[]>(['ford-mustang']);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profile, setProfile] = useState<Profile>({ name: 'Pin Hung', email: 'pinhung@example.com' });
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState('');
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (!raw || !active) return;
      const saved: unknown = JSON.parse(raw);
      if (!saved || typeof saved !== 'object') return;
      const state = saved as Partial<{ dark: boolean; favorites: string[]; bookings: Booking[]; profile: Profile }>;
      if (typeof state.dark === 'boolean') setDark(state.dark);
      if (Array.isArray(state.favorites) && state.favorites.every(id => typeof id === 'string')) setFavorites(state.favorites);
      if (Array.isArray(state.bookings)) setBookings(state.bookings.filter(b => b && typeof b.id === 'string' &&
        typeof b.vehicleId === 'string' && typeof b.startDate === 'string' && Number.isInteger(b.days) && b.days > 0 && typeof b.total === 'number'));
      if (state.profile && typeof state.profile.name === 'string' && typeof state.profile.email === 'string') setProfile(state.profile);
    }).catch(() => { if (active) setStorageError('Saved data could not be loaded. You can still use this session.'); })
      .finally(() => { if (active) setReady(true); });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ dark, favorites, bookings, profile }))
      .catch(() => setStorageError('Changes could not be saved on this device.'));
  }, [dark, favorites, bookings, profile, ready]);
  const toggleFavorite = (id: string) => setFavorites(current => current.includes(id)
    ? current.filter(item => item !== id) : [...current, id]);
  const addBooking = (booking: Omit<Booking, 'id'>) => setBookings(current => [...current,
    { ...booking, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }]);
  return <AppContext.Provider value={{ dark, colors: dark ? darkColors : lightColors, ready, storageError,
    favorites, bookings, profile, toggleFavorite, addBooking, toggleTheme: () => setDark(current => !current),
    cancelBooking: id => setBookings(current => current.filter(booking => booking.id !== id)), updateProfile: setProfile,
  }}>{children}</AppContext.Provider>;
}
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be called inside AppProvider');
  return context;
}
