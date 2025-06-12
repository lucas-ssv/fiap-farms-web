import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-family-body)'],
      },
      fontWeight: {
        regular: 'var(--font-weight-regular)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
      },
      colors: {
        'custom-black': 'var(--color-custom-black)',
        'custom-gray': 'var(--color-custom-gray)',
        'custom-lightgray': 'var(--color-custom-lightgray)',
      },
      container: {
        screens: {
          sm: '360px',
          md: '720px',
          lg: '1200px',
        },
      },
    },
    screens: {
      sm: '360px',
      md: '720px',
      lg: '1200px',
      xl: '1920px',
    },
  },
  plugins: [],
}

export default config
