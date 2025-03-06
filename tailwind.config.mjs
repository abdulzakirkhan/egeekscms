/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        red:"#951B46",
        blck:"#5A686F",
        grey:"#8E8E93"
      },
      width: {
        114: "114px", // Custom width class (w-114)
        410:"480px",
      },
      height: {
        108: "108px", // Custom height (h-114)
      },

    },
  },
  plugins: [],
};
