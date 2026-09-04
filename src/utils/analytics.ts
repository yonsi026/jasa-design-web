import { AnalyticsEvent } from '../types';

type Listener = (event: AnalyticsEvent) => void;
const listeners: Listener[] = [];

export function trackEvent(
  eventName: AnalyticsEvent['eventName'],
  payload?: Record<string, unknown>
): void {
  const event: AnalyticsEvent = {
    eventName,
    payload,
    timestamp: new Date(),
  };

  // Log clearly in console for debugging & verification
  console.log(`[Analytics Event Tracked]: ${eventName}`, payload || {});

  // Notify active UI listeners (e.g. toasts or dev trackers)
  listeners.forEach((listener) => listener(event));
}

export function subscribeAnalytics(listener: Listener): () => void {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
}
