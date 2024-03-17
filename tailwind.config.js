/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js,ejs}"],
    darkMode: "selector",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                serif: ["Roboto Slab", "serif"],
            },
        },
    },
    plugins: [],
};
