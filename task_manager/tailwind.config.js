// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{html,js}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add all your component files here
  ],
  theme: {
    extend: {
      animation: {
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(-25%)", opacity: "0.7" },
          "50%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      colors: {
        "green-400": "#4caf50", // Example green color
        "red-400": "#f44336", // Example red color
      },
    },
  },
  plugins: [],
};