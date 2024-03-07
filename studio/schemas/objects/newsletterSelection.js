import { defineField } from 'sanity'

export default defineField({
	type: 'object',
	name: 'newsletterSelection',
	title: 'Newsletter',
	description: 'Override the default newsletter selection',
	fields: [
		defineField({
			type: 'boolean',
			title: 'Active',
			name: 'active',
		}),
		defineField({
			type: 'string',
			title: 'Title',
			name: 'title',
			hidden: ({ parent }) => !parent?.active,
		}),
		defineField({
			type: 'string',
			title: 'Segment',
			name: 'segment',
			options: {
				list: [
					{ title: 'dev test', value: '65e987731caf744c3a8cc3d3' },
					{ title: 'List B', value: '23423dddd' },
				],
			},
			hidden: ({ parent }) => !parent?.active,
		}),
	]
})