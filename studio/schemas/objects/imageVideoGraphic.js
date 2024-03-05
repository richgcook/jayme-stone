import { defineField } from 'sanity'
import { GraphicInput } from '../components/GraphicSelectInputB'

export const GRAPHICS = Array.from({ length: 6 }, (_, index) => ({
    title: `Option ${index + 1}`,
    value: `${index + 1 < 10 ? '0' : ''}${index + 1}`
}))

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
			hidden: ({ parent }) => !parent?.active,
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