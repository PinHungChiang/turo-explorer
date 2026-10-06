export const lightColors = {
  background: '#FFFFFF', surface: '#F2F2F2', text: '#141414', muted: '#747474',
  border: '#DDDDDD', primary: '#6554FF', onPrimary: '#FFFFFF', accent: '#EBE8FF',
};
export const darkColors: typeof lightColors = {
  background: '#080808', surface: '#242424', text: '#ECECEC', muted: '#A0A0A0',
  border: '#393939', primary: '#6554FF', onPrimary: '#FFFFFF', accent: '#292340',
};
export type Colors = typeof lightColors;
