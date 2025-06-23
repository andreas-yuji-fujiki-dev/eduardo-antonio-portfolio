'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/stores/themeStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
  }, [theme]);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}