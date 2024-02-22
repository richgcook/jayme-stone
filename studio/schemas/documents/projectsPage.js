import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
	type: "document",
	title: "Projects",
	name: "projectsPage",
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
			type: 'array',
			title: 'Integrator projects',
			name: 'integratorProjects',
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Project',
					name: 'project',
					fields: [
						defineField({
							type: 'string',
							title: 'Title',
							name: 'title',
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
					]
				})
			],
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
	]
})