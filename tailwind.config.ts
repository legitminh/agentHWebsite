import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        //mono
        c0: "var(--color-0)",  
        c4: "var(--color-4)",  
        c8: "var(--color-8)",  
        cc: "var(--color-c)",  
        c10: "var(--color-10)", 

        //blue
        c4Blue: "var(--color-4Blue)", 
        c8Blue: "var(--color-8Blue)", 
        ccBlue: "var(--color-cBlue)",

        //clear
        c4Clear: "var(--color-4Clear)", 
        c8Clear: "var(--color-8Clear)", 
        ccClear: "var(--color-cClear)"
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('tailwind-scrollbar-hide')
  ],
} satisfies Config;