import { defineType, defineField } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'
import { Article, Play, SpeakerHigh } from '@phosphor-icons/react'

export default defineType({
	type: "document",
	title: "Video",
	name: "video",
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
					validation: Rule => Rule.required()
				}),
				defineField({
					type: 'colorPicker',
					title: 'Text',
					name: 'text',
					validation: Rule => Rule.required()
				}),
				defineField({
					type: 'colorPicker',
					title: 'Button',
					name: 'button',
					validation: Rule => Rule.required()
				}),
				defineField({
					type: 'colorPicker',
					title: 'Icon',
					name: 'icon',
					validation: Rule => Rule.required()
				}),
				defineField({
					type: 'colorPicker',
					title: 'Graphic',
					name: 'graphic',
					description: 'Used for graphics, if applicable'
				}),
			],
		}),
		defineField({
			type: 'imageVideoGraphic',
			title: 'Graphic',
			name: 'imageVideoGraphic',
		}),
		defineField({
			type: 'image',
			title: 'Cover/thumbnail image',
			name: 'coverImage',
			fields: [
				defineField({
					name: 'alt',
					type: 'alt'
				}),
			],
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'text',
			title: 'Embed code',
			name: 'embedCode',
			rows: 6,
			validation: Rule => Rule.required()
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
		orderRankField(
			{ type: 'video' }
		)
	],
})