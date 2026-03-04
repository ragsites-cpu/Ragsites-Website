interface Window {
  gtag: (...args: unknown[]) => void;
  fbq: (...args: unknown[]) => void;
  Cal: ((...args: unknown[]) => void) & { loaded?: boolean; ns?: Record<string, unknown>; q?: unknown[] };
}
