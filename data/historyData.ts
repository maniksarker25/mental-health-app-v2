import type { HistoryEntry } from '@/types';
import historyJson from './history.json';

export const mockHistoryEntries: HistoryEntry[] = historyJson as HistoryEntry[];

export function getMockHistoryForUser(userId: string): HistoryEntry[] {
  const userEntries = mockHistoryEntries.filter((h) => h.userId === userId);
  return userEntries.length > 0 ? userEntries : mockHistoryEntries;
}
