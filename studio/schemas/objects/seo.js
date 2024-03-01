import { defineField } from 'sanity'

export default defineField({
	title: 'SEO / Share settings',
	name: 'seo',
	type: 'object',
	options: {
		collapsible: true,
		collapsed: true
	},
	fields: [
		defineField({
			title: 'Title',
			name: 'metaTitle',
			type: 'string',
			description: 'Title used for search engines and browsers',
			validation: Rule => Rule.max(50).warning('Longer titles may be truncated by search engines')
		}),
		defineField({
			title: 'Description',
			name: 'metaDescription',
			type: 'text',
			rows: 3,
			description: 'Description for search engines',
			validation: Rule => Rule.max(150).warning('Longer descriptions may be truncated by search engines')
		}),
	]
})