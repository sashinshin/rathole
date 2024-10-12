/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 7s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        'border-pulse': 'borderPulse 3s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        borderPulse: {
          '0%, 100%': { boxShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff' },
          '50%': { boxShadow: '0 0 15px #ff00ff, 0 0 30px #ff00ff, 0 0 45px #ff00ff' },
        },
      },
    },
  },
  plugins: [],
};
