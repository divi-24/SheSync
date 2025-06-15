/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit", // Force Just-in-Time mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{html,js}",
    "./ecom/**/*.{html,js}",
    "./blogs/**/*.{html,js}",
    "./forum/**/*.{html,js}",
    "./consultation/**/*.{html,js}",
    "./tracker/**/*.{html,js}",
    "./scripts/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },

  safelist: [
    ...Array.from({ length: 101 }, (_, i) => `ml-${i}`),
    ...Array.from({ length: 101 }, (_, i) => `mr-${i}`),
    ...Array.from({ length: 101 }, (_, i) => `mt-${i}`),
    ...Array.from({ length: 101 }, (_, i) => `mb-${i}`),
    ...Array.from({ length: 101 }, (_, i) => `py-${i}`),
    ...Array.from({ length: 101 }, (_, i) => `px-${i}`),
    ...Array.from({ length: 101 }, (_, i) => `h-${i}`),
    ...Array.from({ length: 101 }, (_, i) => `w-${i}`),
  ],

  plugins: [],
  darkMode: 'class',
};
