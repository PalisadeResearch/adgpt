/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				tred: '#dd2d44',
				tyel: '#f69712',
				tgol: '#54acee',
				tblu: '#226699'
			},
			outlineWidth: {
				thin: '0.1px'
			},
			screens: {
				print: { raw: 'print' },
				smol: { raw: '(min-width: 0px)' },
				big: { raw: '(min-width: 590px)' },
				landscape: {
					raw: '(min-width: 400px) and (max-width: 1024px) and (orientation: landscape)'
				}
			}
		}
	},
	plugins: []
};
