module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7f9fb',
          100: '#e8f2ff',
          500: '#9777c0',
          600: '#9f62ed',
          700: '#1c1c1c',
        },
        gray: {
          50: '#f2f2f2',
          100: '#f7f9fb',
          900: '#1c1c1c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Instrument Sans', 'sans-serif'],
      },
      borderRadius: {
        'xl': '15px',
        'lg': '12px',
        'md': '10px',
        'sm': '8px',
      },
    },
  },
  plugins: [],
}
