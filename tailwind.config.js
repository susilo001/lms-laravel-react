import defaultTheme from "tailwindcss/defaultTheme";

const WithMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
export default WithMT({
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
        "./resources/js/**/**/*.tsx",
        "./resources/js/**/**/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    // plugins: [forms, aspecRatio],
});
