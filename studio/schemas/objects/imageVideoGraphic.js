import { defineField } from 'sanity'

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