import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function formatRM(amount: number): string {
  return `RM ${amount.toLocaleString('en-MY', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatPhone(phone: string): string {
  // Ensure +60 prefix
  if (phone.startsWith('0')) {
    return `+60${phone.slice(1)}`;
  }
  if (!phone.startsWith('+')) {
    return `+60${phone}`;
  }
  return phone;
}

export function formatDate(date: string, format = 'DD MMM YYYY'): string {
  return dayjs(date).format(format);
}

export function formatRelativeTime(date: string): string {
  return dayjs(date).fromNow();
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter((part) => !['bin', 'binti', 'a/l', 'a/p'].includes(part.toLowerCase()))
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function getOccupancyPercent(occupied: number, total: number): number {
  return Math.round((occupied / total) * 100);
}
