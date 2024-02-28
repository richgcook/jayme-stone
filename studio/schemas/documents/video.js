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
			type: 'colorPicker',
			title: 'Background color',
			name: 'bgColor',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'colorPicker',
			title: 'Text color',
			name: 'textColor',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'colorPicker',
			title: 'Button color',
			name: 'buttonColor',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'colorPicker',
			title: 'Icon color',
			name: 'iconColor',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'colorPicker',
			title: 'Graphic color',
			name: 'graphicColor',
			description: 'Used for graphics, if applicable'
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
			type: 'boolean',
			title: 'Add graphic',
			name: 'hasGraphic',
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