/**
 * The registry of reminder providers. To add a new reminder (weigh-in due,
 * vaccine coming up, training practice, …), write a provider under this folder
 * and add it here. The sender and the service worker need no other changes.
 */
import { dailyChecklistProvider } from './daily-checklist';
import { dueSoonProvider } from './due-soon';
import type { ReminderProvider } from '../lib';

export const providers: ReminderProvider[] = [dailyChecklistProvider, dueSoonProvider];
