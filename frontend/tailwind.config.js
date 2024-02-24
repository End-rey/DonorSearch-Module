/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // colors: {
      //   redMain: '#F63F3E',
      //   links: '#5338FF',
      //   dark: '#38333F',
      //   border: 'var(--tg-theme-section-header-text-color)',
      //   input: 'var(--tg-theme-section-header-text-color)',
      //   ring: 'var(--tg-theme-hint-color)',
      //   background: 'var(--tg-theme-bg-color)',
      //   foreground: 'var(--tg-theme-text-color)',
      //   keyframes: {
      //     'accordion-down': {
      //       from: { height: '0' },
      //       to: { height: 'var(--radix-accordion-content-height)' },
      //     },
      //     'accordion-up': {
      //       from: { height: 'var(--radix-accordion-content-height)' },
      //       to: { height: '0' },
      //     },
      //   },
      //   animation: {
      //     'accordion-down': 'accordion-down 0.2s ease-out',
      //     'accordion-up': 'accordion-up 0.2s ease-out',
      //   },
      //   primary: {
      //     DEFAULT: 'var(--tg-theme-button-color)',
      //     foreground: 'var(--tg-theme-button-text-color)',
      //   },
      //   secondary: {
      //     DEFAULT: 'var(--tg-theme-button-text-color)',
      //     foreground: 'var(--tg-theme-button-color)',
      //   },
      //   destructive: {
      //     DEFAULT: 'var(--tg-theme-destructive-text-color)',
      //     foreground: 'var(--tg-theme-text-color)',
      //   },
      //   muted: {
      //     DEFAULT: 'var(--tg-theme-secondary-bg-color)',
      //     foreground: 'var(--tg-theme-subtitle-text-color)',
      //   },
      //   accent: {
      //     DEFAULT: 'var(--tg-theme-button-text-color)',
      //     foreground: 'var(--tg-theme-accent-text-color)',
      //   },
      //   popover: {
      //     DEFAULT: 'var(--tg-theme-section-bg-color)',
      //     foreground: 'var(--tg-theme-section-header-text-color)',
      //   },
      //   card: {
      //     DEFAULT: 'var(--tg-theme-section-bg-color)',
      //     foreground: 'var(--tg-theme-section-header-text-color)',
      //   },
      // },
      colors: {
        redMain: '#F63F3E',
        links: '#5338FF',
        dark: '#38333F',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        keyframes: {
          'accordion-down': {
            from: { height: '0' },
            to: { height: 'var(--radix-accordion-content-height)' },
          },
          'accordion-up': {
            from: { height: 'var(--radix-accordion-content-height)' },
            to: { height: '0' },
          },
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
