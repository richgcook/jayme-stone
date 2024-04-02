import { defineType, defineField, defineArrayMember } from 'sanity'

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
			type: 'pressKitPhotos',
			title: 'Photos',
			name: 'photos',
		}),
		defineField({
			type: 'pressKitResources',
			title: 'Resources',
			name: 'resources',
		}),
		defineField({
			type: 'pressKitContact',
			title: 'Contact',
			name: 'contact',
		}),
		defineField({
			type: 'newsletterSelection',
			name: 'newsletterSelection',
			title: 'Newsletter selection',
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	]
})