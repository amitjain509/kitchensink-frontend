import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const NoirPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#c0dbfd',
      300: '#94c5fc',
      400: '#62a5f8',
      500: '#4285f4',
      600: '#2763e9',
      700: '#1f4ed6',
      800: '#2041ad',
      900: '#1f3b89',
      950: '#182553'
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.600}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.800}',
          activeColor: '{primary.900}'
        },
        highlight: {
          background: '{primary.950}',
          focusBackground: '{primary.700}',
          color: '#ffffff',
          focusColor: '#ffffff'
        },
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}'
        }
      },
      dark: {
        primary: {
          color: '{primary.200}',
          contrastColor: '{primary.800}',
          hoverColor: '{primary.300}',
          activeColor: '{primary.400}'
        },
        highlight: {
          background: '{primary.400}',
          focusBackground: '{primary.500}',
          color: '{primary.900}',
          focusColor: '{primary.900}'
        },
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}'
        }
      }
    }
  }
});
