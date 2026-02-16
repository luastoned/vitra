import { useTheme } from 'next-themes';

export type ColorMode = 'light' | 'dark';

export type UseColorModeReturn = {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
};

const normalizeColorMode = (theme: string | undefined): ColorMode => {
  return theme === 'dark' ? 'dark' : 'light';
};

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme();
  const colorMode = normalizeColorMode(forcedTheme ?? resolvedTheme);

  const setColorMode = (nextColorMode: ColorMode) => {
    setTheme(nextColorMode);
  };

  const toggleColorMode = () => {
    setTheme(colorMode === 'dark' ? 'light' : 'dark');
  };

  return {
    colorMode,
    setColorMode,
    toggleColorMode,
  };
}

export function useColorModeValue<T>(light: T, dark: T): T {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? dark : light;
}
