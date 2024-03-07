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
					{ title: 'Bio-Writing', value: '65e9c77e54a01e47d0474e35' },
					{ title: 'Lessons', value: '65e9c77254a01e47d0474d6b' },
					{ title: 'Coaching', value: '65e9c751bd18129f8a6785c8' },
				],
			},
			description: 'The default segment is "New Subscribers"',
			hidden: ({ parent }) => !parent?.active,
		}),
	]
})