/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'palestine-red': '#EE2A35',
        'palestine-green': '#239D58',
        'palestine-black': '#000000',
        'palestine-white': '#FFFFFF',
        'light-gray': '#F7F8FA',
        'medium-gray': '#E0E0E0',
        'dark-gray': '#A0AEC0',
        'text-primary': '#2D3748',
        'text-secondary': '#718096',
        'dark-bg': '#1A202C',
        'dark-surface': '#2D3748',
        'dark-text-primary': '#F7FAFC',
        'dark-text-secondary': '#A0AEC0',
        'dark-border': '#4A5568',
        'dark-hover': '#4A5568',
        'ai-purple': '#805AD5',
        'ai-light-purple': '#FAF5FF',
        'dark-ai-light-purple': '#322659',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
};