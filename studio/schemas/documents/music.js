import { defineType, defineField, defineArrayMember } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'
import { Link } from '@phosphor-icons/react'

export default defineType({
	type: "document",
	title: "Music",
	name: "music",
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
			type: 'image',
			title: 'Featured image',
			name: 'featuredImage',
			fields: [
				defineField({
					name: 'alt',
					type: 'alt'
				}),
			],
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'object',
			title: 'Colors',
			name: 'colors',
			options: {
				collapsible: true,
				collapsed: false
			},
			fields: [
				defineField({
					type: 'colorPicker',
					title: 'Background',
					name: 'bg',
					options: {
						collapsible: false
					},
					validation: Rule => Rule.required()
				}),
				defineField({
					type: 'colorPicker',
					title: 'Text',
					name: 'text',
					options: {
						collapsible: false
					},
					validation: Rule => Rule.required()
				}),
			],
		}),
		defineField({
			type: 'array',
			title: 'Streaming links',
			name: 'streamingLinks',
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
								scheme: ['https', 'http']
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
		orderRankField(
			{ type: 'music' }
		)
	],
})