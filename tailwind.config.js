import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import aspecRatio from "@tailwindcss/aspect-ratio";

const WithMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
export default WithMT({
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms, aspecRatio],
});
