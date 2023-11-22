/** @type {import('tailwindcss').Config} */
export const content = [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
];
export const theme = {
    container: {
        center: true,
        padding: "2rem",
        screens: {
            "2xl": "1400px",
        },
    },
    fontFamily: {
        sans: [
            '"Inter var", sans-serif',
            {
                fontFeatureSettings: '"cv11", "ss01"',
                fontVariationSettings: '"opsz" 32',
            },
        ],
    },
    extend: {
        keyframes: {
            "accordion-down": {
                from: { height: 0 },
                to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
                from: { height: "var(--radix-accordion-content-height)" },
                to: { height: 0 },
            },
        },
        animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
        },
    },
};
export const plugins = [import("tailwindcss-animate")];
