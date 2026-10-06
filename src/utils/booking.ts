export const money = (amount: number) => new Intl.NumberFormat('en-CA', {
  style: 'currency', currency: 'CAD', maximumFractionDigits: 2,
}).format(amount);
// Demo-only fee schedule; this is not Turo pricing.
export function quote(price: number, days: number) {
  const subtotal = price * days;
  const fee = 15;
  const tax = Math.round((subtotal + fee) * 0.05 * 100) / 100;
  return { subtotal, fee, tax, total: Math.round((subtotal + fee + tax) * 100) / 100 };
}
export function validStartDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day && date >= today;
}
export function tomorrow(): string {
  const date = new Date(); date.setDate(date.getDate() + 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
