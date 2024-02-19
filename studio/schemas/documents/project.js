import { defineType, defineField } from 'sanity'
import { Article, Play, SpeakerHigh } from '@phosphor-icons/react'

export default defineType({
	type: "document",
	title: "Project",
	name: "project",
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
			type: 'string',
			title: 'Subtitle',
			name: 'subtitle',
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
			title: 'External link',
			name: 'externalLink',
			description: 'If used the project will link to the provided URL',
			fields: [
				defineField({
					type: 'url',
					title: 'URL',
					name: 'url',
				}),
			],
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
			media: 'featuredImage'
		},
		prepare(selection) {
			const { title, subtitle, media } = selection
			return {
				title: title,
				subtitle: subtitle,
				media: media
			}
		}
	}
})