import { defineType, defineField } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
	type: "document",
	title: "Project",
	name: "projectIntegrator",
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
			fields: [
				defineField({
					type: 'string',
					title: 'Label',
					name: 'label',
					validation: Rule => Rule.required()
				}),
				defineField({
					type: 'string',
					title: 'URL',
					name: 'url',
					validation: Rule => Rule.required()
				}),
			],
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
		orderRankField(
			{ type: 'projectIntegrator' }
		)
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