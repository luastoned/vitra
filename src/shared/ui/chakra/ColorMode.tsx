import type { IconButtonProps, SpanProps } from '@chakra-ui/react';
import { ClientOnly, IconButton, Skeleton, Span } from '@chakra-ui/react';
import { type IconProps, Moon, Sun } from '@phosphor-icons/react';
import type { ThemeProviderProps } from 'next-themes';
import { ThemeProvider } from 'next-themes';
import * as React from 'react';

import { useColorMode } from '~/shared/hooks/use-color-mode';

export type ColorModeProviderProps = ThemeProviderProps;

export function ColorModeProvider(props: ColorModeProviderProps) {
  return <ThemeProvider attribute="class" disableTransitionOnChange {...props} />;
}

export function ColorModeIcon(props: IconProps) {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? <Moon {...props} /> : <Sun {...props} />;
}

export type ColorModeButtonProps = Omit<IconButtonProps, 'aria-label'>;

export const ColorModeButton = React.forwardRef<HTMLButtonElement, ColorModeButtonProps>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode();

  return (
    <ClientOnly fallback={<Skeleton boxSize="9" />}>
      <IconButton onClick={toggleColorMode} variant="ghost" aria-label="Toggle color mode" size="sm" ref={ref} {...props}>
        <ColorModeIcon size={18} weight="duotone" />
      </IconButton>
    </ClientOnly>
  );
});

export const LightMode = React.forwardRef<HTMLSpanElement, SpanProps>(function LightMode(props, ref) {
  return <Span color="fg" display="contents" className="chakra-theme light" colorPalette="gray" colorScheme="light" ref={ref} {...props} />;
});

export const DarkMode = React.forwardRef<HTMLSpanElement, SpanProps>(function DarkMode(props, ref) {
  return <Span color="fg" display="contents" className="chakra-theme dark" colorPalette="gray" colorScheme="dark" ref={ref} {...props} />;
});
