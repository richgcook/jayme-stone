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
			type: 'string',
			title: 'Subtitle',
			name: 'subtitle',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'richText',
			title: 'Introduction',
			name: 'introduction',
		}),
		defineField({
			type: 'string',
			title: 'Submit button label',
			name: 'submitLabel',
			initialValue: 'Submit',
		}),
		defineField({
			type: 'text',
			title: 'Success message',
			name: 'successMessage',
			rows: 2,
			initialValue: `Thank you for getting in touch!`,
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	],
})