/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'borderlogix': {
          primary: '#1e40af',
          secondary: '#3b82f6',
          accent: '#10b981',
          dark: '#1e293b',
          light: '#f1f5f9',
        },
        'customs': {
          green: '#166534',
          gold: '#ca8a04',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
