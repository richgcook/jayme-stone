import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
	type: "document",
	title: "Home",
	name: "homePage",
	fields: [
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
			type: 'richText',
			title: 'Introduction',
			name: 'introduction',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'reference',
			title: 'Featured music',
			name: 'featuredMusic',
			to: [{ type: 'music' }],
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'reference',
			title: 'Featured video',
			name: 'featuredVideo',
			to: [{ type: 'video' }],
			validation: Rule => Rule.required()
		}),
		defineType({
			type: 'testimonialsA',
			name: 'testimonialsA',
			title: 'Testimonials',
		}),
		defineType({
			type: 'newsletterSelection',
			name: 'newsletterSelection',
			title: 'Newsletter selection',
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	],
	preview: {
		prepare() {
			return {
				title: 'Home'
			}
		}
	}
})  