import { defineField } from 'sanity'
import { GraphicInput } from '../components/GraphicSelectInput'

export const GRAPHICS = [
	{ title: 'Option 1', value: '1' },
	{ title: 'Option 2', value: '2' },
	{ title: 'Option 3', value: '3' },
	{ title: 'Option 4', value: '4' },
	{ title: 'Option 5', value: '5' },
	{ title: 'Option 6', value: '6' },
]

export default defineField({
	type: 'object',
	title: 'Graphic',
	name: 'imageVideoGraphic',
	fields: [
		defineField({
			type: 'boolean',
			title: 'Add graphic',
			name: 'active',
		}),
		defineField({
			type: 'string',
			title: 'Graphic',
			name: 'graphic',
			options: {
				list: GRAPHICS.map(({title, value}) => ({title, value})),
				layout: 'radio',
				direction: 'horizontal',
			},
			components: { input: GraphicInput },
		}),
		defineField({
			type: 'string',
			title: 'Position',
			name: 'position',
			options: {
				list: [
					{ title: 'Left', value: 'left' },
					{ title: 'Right', value: 'right' },
					{ title: 'Top', value: 'top' },
					{ title: 'Bottom', value: 'bottom' },
				],
				layout: 'radio',
				direction: 'horizontal'
			},
			initialValue: 'left',
			hidden: ({ parent }) => !parent?.active,
		}),
	],
})