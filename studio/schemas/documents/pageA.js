import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
	type: "document",
	title: "Page",
	name: "pageA",
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
			type: 'pageBuilderA',
			title: 'Content',
			name: 'pageBuilder',
		}),
		defineField({
			type: 'array',
			title: 'Selected tracks',
			name: 'selectedTracks',
			hidden: ({document}) => document?.slug?.current !== 'producer',
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Track',
					name: 'track',
					fields: [
						defineField({
							type: 'image',
							title: 'Image',
							name: 'image',
							fields: [
								{
									type: 'alt',
									name: 'alt'
								}
							],
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'file',
							title: 'File',
							name: 'file',
							options: {
								accept: '.mp3'
							},
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
							title: 'Artist(s)',
							name: 'artists',
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'richText',
							title: 'Role',
							name: 'role',
						}),
					],
				}),
			]
		}),
		defineType({
			type: 'testimonialsA',
			name: 'testimonialsA',
			title: 'Testimonials',
			hidden: ({document}) => document?.slug?.current == 'about',
		}),
		defineType({
			type: 'testimonialsB',
			name: 'testimonialsB',
			title: 'Testimonials',
			hidden: ({document}) => document?.slug?.current !== 'about',
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	]
})