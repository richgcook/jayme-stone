import { defineField, defineArrayMember } from 'sanity'
import { FileArrowDown } from '@phosphor-icons/react'

export default defineField({
	type: 'array',
	title: 'Resources',
	name: 'pressKitResources',
	of: [
		defineArrayMember({
			type: 'object',
			title: 'Download',
			name: 'download',
			fields: [
				defineField({
					type: 'string',
					title: 'Title',
					name: 'title',
					validation: Rule => Rule.required()
				}),
				defineField({
					type: 'file',
					title: 'File',
					name: 'file',
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
						media: FileArrowDown
					}
				}
			}
		}),
	]
})