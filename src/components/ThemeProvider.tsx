'use client';
import { NextUIProvider } from '@nextui-org/react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * NextUI Theme provider
 */
export default function ThemeProvider({ children }: ThemeProviderProps) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
