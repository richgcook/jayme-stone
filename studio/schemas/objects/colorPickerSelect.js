import { defineType } from 'sanity'
import { ColorInput } from '../components/ColorPickerSelect'

export const COLORS = [
	{ title: 'White', value: '#141313' },
	{ title: 'Beige', value: '#141313' },
	{ title: 'Green', value: '#f7f1ee' },
	{ title: 'Red', value: '#e75f5c' },
	{ title: 'Pink', value: '#eabad8' },
	{ title: 'Yellow', value: '#e4aa58' },
	{ title: 'Blue', value: '#4976af' },
]

export default defineType({
	type: 'string',
	title: 'Colors',
	name: 'colorPickerSelect',
	options: {
		list: COLORS.map(({title, value}) => ({title, value})),
		layout: 'radio',
		direction: 'horizontal',
	},
	//components: { input: ColorInput },
})