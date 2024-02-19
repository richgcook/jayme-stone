import { defineType, defineField, defineArrayMember } from 'sanity'
import { FileArrowDown, Link } from '@phosphor-icons/react'

export default defineType({
	type: "document",
	title: "Press Kit",
	name: "pressPage",
	fields: [
		defineField({
			type: 'string',
			title: 'Title',
			name: 'title',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'slug',
			title: 'Slug',
			name: 'slug',
			options: {
				source: 'title'
			},
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'array',
			title: 'Photos',
			name: 'photos',
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
		}),
		defineField({
			type: 'array',
			title: 'Writing',
			name: 'writing',
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
		}),
		defineField({
			type: 'array',
			title: 'Contact',
			name: 'contact',
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
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	]
})