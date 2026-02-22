/** @type {import('tailwindcss').Config} */
export default {
  content: ["./entrypoints/**/*.{html,ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
      },
    },
  },
  plugins: [],
};
