import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Quicksand Variable', sans-serif" },
        body: { value: "'Roboto Flex Variable', sans-serif" },
        mono: { value: "'Roboto Mono Variable', monospace" },
      },
      colors: {
        cyberpunk: {
          50: { value: '#f2e5ff' },
          100: { value: '#dbbfff' },
          200: { value: '#c399ff' },
          300: { value: '#ab73ff' },
          400: { value: '#943dff' },
          500: { value: '#7d00e6' }, // Primary Purple
          600: { value: '#6900b8' },
          700: { value: '#56008a' },
          800: { value: '#42005c' },
          900: { value: '#2e003e' },
          950: { value: '#1a0010' },
        },
      },
    },
    semanticTokens: {},
  },
});
