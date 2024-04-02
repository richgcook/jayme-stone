import { defineField, defineArrayMember } from 'sanity'

export default defineField({
	type: 'array',
	title: 'Photos',
	name: 'pressKitPhotos',
	of: [
		defineArrayMember({
			type: 'object',
			title: 'Download',
			name: 'download',
			fields: [
				defineField({
					type: 'image',
					title: 'Image',
					name: 'image',
					fields: [
						defineField({
							name: 'alt',
							type: 'alt'
						}),
					],
					validation: Rule => Rule.required()
				}),
				defineField({
					type: 'string',
					title: 'Title',
					name: 'title',
					validation: Rule => Rule.required()
				}),
				defineField({
					type: 'string',
					title: 'Credit(s)',
					name: 'credits',
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
					media: 'image'
				},
				prepare(selection) {
					const { title, media } = selection
					return {
						title: title,
						media: media
					}
				}
			}
		}),
	]
})