import { defineType, defineField } from 'sanity'
import { Article, Play, SpeakerHigh } from '@phosphor-icons/react'

export default defineType({
	type: "document",
	title: "Form",
	name: "form",
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
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	],
})