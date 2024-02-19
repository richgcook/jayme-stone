import { defineType } from 'sanity'

export default defineType({
	type: 'color',
	name: 'color',
	title: 'Color',
	options: {
		colorList: [
			{ hex: '#ffffff' },
			'#141313',
			'#f7f1ee', // Beige
			'#04674a', // Green
			'#e75f5c', // Red
			'#eabad8', // Pink
			'#e4aa58', // Yellow
			'#4976af', // Blue
		]
	},
})