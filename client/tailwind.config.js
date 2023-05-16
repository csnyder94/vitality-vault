/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	safelist: [
		{
			pattern: /./,
		},
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
