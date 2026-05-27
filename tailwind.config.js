/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#070707',
        panel: '#141414',
        line: '#2C2A26',
        thunder: {
          blue: '#007AC1',
          cyan: '#00A3FF',
          orange: '#FF5A1F',
          ember: '#FF7A00',
          metallic: '#AAB3B8',
        },
      },
      boxShadow: {
        neon: '0 0 36px rgba(0, 163, 255, 0.22)',
        ember: '0 0 34px rgba(255, 90, 31, 0.26)',
        metallic: '0 0 30px rgba(169, 178, 184, 0.22)',
      },
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'Segoe UI', 'sans-serif'],
        body: ['Inter', 'Segoe UI', 'sans-serif'],
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        pulseLine: 'pulseLine 3.5s ease-in-out infinite',
        sweep: 'sweep 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseLine: {
          '0%, 100%': { opacity: '0.28' },
          '50%': { opacity: '1' },
        },
        sweep: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
      },
    },
  },
  plugins: [],
};
