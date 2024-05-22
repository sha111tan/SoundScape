const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        "ibm-plex-mono": ['"IBMPlexMono"', "Arial", "sans-serif"],
      },
      fontWeight: {
        "extra-bold": 900,
      },
      backdropBlur: {
        18: "18px",
      },
      saturate: {
        150: "1.5",
      },
      clipPath: {
        "inset-round": "inset(12px 12px 12px 12px round 12px)",
      },
      backgroundColor: {
        "black-20": "rgba(0, 0, 0, 0.1)",
      },
      colors: {
        orange: "#f1814a",
      },
      keyframes: {
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        gradient: "gradient 6s linear infinite",
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
      },
    },
  },
  variants: {
    extend: {
      backdropBlur: ["responsive"],
      saturate: ["responsive"],
      clipPath: ["responsive"],
    },
  },
  darkMode: "class",
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".will-change-opacity": {
          willChange: "opacity",
        },
      });
    },
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            primary: {
              foreground: "#ffffff",
              DEFAULT: "#000000",
            },
            warning: {
              foreground: "#ffffff",
              DEFAULT: "#f1814a",
            },
          },
        },
        dark: {
          colors: {
            warning: {
              foreground: "#ffffff",
              DEFAULT: "#f1814a",
            },
            primary: {
              foreground: "#000000",
              DEFAULT: "#ffffff",
            },
          },
        },
      },
    }),
  ],
};
