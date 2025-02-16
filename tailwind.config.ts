import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#011829',
        secondary: '#030f1c',
        background: '#000000',
        accent: '#87fafd',
        dark: {
          DEFAULT: '#011829',
          secondary: '#030f1c',
          black: '#000000',
        },
        tremor: {
          brand: {
            faint: '#87fafd10',
            muted: '#87fafd40',
            subtle: '#87fafd60',
            DEFAULT: '#87fafd',
            emphasis: '#87fafd80',
            inverted: '#011829',
          },
          background: {
            muted: 'rgb(0 0 0 / 0.1)',
            subtle: 'rgb(0 0 0 / 0.2)',
            DEFAULT: 'transparent',
            emphasis: 'rgb(0 0 0 / 0.3)',
          },
          border: {
            DEFAULT: 'rgb(255 255 255 / 0.1)',
          },
          ring: {
            DEFAULT: 'rgb(135 250 253 / 0.3)',
          },
        },
      },
      backgroundImage: {
        'gradient-primary':
          'linear-gradient(to bottom, var(--primary-dark), var(--secondary-dark), var(--background-dark))',
        'gradient-accent':
          'linear-gradient(135deg, rgba(135, 250, 253, 0.15), rgba(135, 250, 253, 0.05))',
      },
      boxShadow: {
        'accent-glow': '0 0 20px rgba(135, 250, 253, 0.15)',
        'accent-glow-sm': '0 0 10px rgba(135, 250, 253, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
