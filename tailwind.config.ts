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
        c00: "var(--color-00)",  
        c40: "var(--color-40)",  
        c80: "var(--color-80)",  
        cc0: "var(--color-c0)",  
        cff: "var(--color-ff)", 
        cgolda0: "var(--color-golda0)", 
        cgoldc0: "var(--color-goldc0)", 
        cblue80: "var(--color-blue80)", 
        cblue40: "var(--color-blue40)",
        cbluec0: "var(--color-bluec0)",
        cred80: "var(--color-red80)", 
        cred40: "var(--color-red40)",
        credc0: "var(--color-redc0)",


      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('tailwind-scrollbar-hide')
  ],
} satisfies Config;