const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcss_nesting = require('postcss-nesting');
const postcss_import = require('postcss-import');
const tailwind_nesting = require('tailwindcss/nesting');

const config = {
	plugins: [postcss_nesting(), postcss_import(), tailwind_nesting(), tailwindcss(), autoprefixer()]
};

module.exports = config;
