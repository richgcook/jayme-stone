import { defineType, defineField, defineArrayMember } from 'sanity'
import { PAGE_REFERENCES } from '../../constants'

export default defineType({
	type: 'document',
	title: 'General settings',
	name: 'settingsGeneral',
	fields: [
		defineField({
			type: 'array',
			title: 'Menu',
			name: 'menuA',
			of: [
				defineArrayMember({
					type: 'reference',
					to: PAGE_REFERENCES,
				})
			],
			validation: Rule => Rule.unique()
		}),
		defineField({
			type: 'array',
			title: 'Social media links',
			name: 'socialLinks',
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Link',
					name: 'link',
					fields: [
						defineField({
							type: 'string',
							title: 'Title',
							name: 'title',
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'url',
							title: 'URL',
							name: 'url',
							validation: Rule => Rule.required()
						})
					]
				})
			]
		}),
	]
})