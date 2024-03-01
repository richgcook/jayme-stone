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
			title: 'List type',
			name: 'list',
			options: {
				list: [
					{ title: 'List A', value: '234234csdfs' },
					{ title: 'List B', value: '23423dddd' },
				],
			},
			hidden: ({ parent }) => !parent?.active,
		}),
	]
})