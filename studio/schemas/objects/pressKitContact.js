import { defineField, defineArrayMember } from 'sanity'
import { Link } from '@phosphor-icons/react'

export default defineField({
	type: 'array',
	title: 'Contact',
	name: 'pressKitContact',
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
					title: 'Link',
					name: 'link',
					validation: Rule => Rule.uri({
						scheme: ['https', 'http', 'mailto', 'tel']
					})
				}),
			],
			preview: {
				select: {
					title: 'title',
				},
				prepare(selection) {
					const { title } = selection
					return {
						title: title,
						media: Link
					}
				}
			}
		}),
	]
})