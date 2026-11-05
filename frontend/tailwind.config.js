export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1A1A1A',
        muted: '#8A8A8A',
        line: '#E5E5E5',
        charcoal: '#2B2B2B',
        warm: '#F5F3EF',
      },
      fontFamily: {
        logo: ['"Bodoni Moda"', 'Georgia', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { label: '0.2em', wider2: '0.3em' },
    },
  },
  plugins: [],
};
