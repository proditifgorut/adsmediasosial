/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
        },
        purple: {
          100: '#f3e8ff',
          600: '#9333ea',
          800: '#6b21a8',
        },
        green: {
          100: '#dcfce7',
          600: '#16a34a',
          800: '#15803d',
        },
        orange: {
          100: '#fff7ed',
          600: '#f97316',
        },
        yellow: {
          100: '#fef9c3',
          800: '#854d0e',
        }
      }
    }
  },
  plugins: [],
};
