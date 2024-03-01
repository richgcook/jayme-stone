import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
	type: "document",
	title: "Home",
	name: "homePage",
	fields: [
		defineField({
			type: 'object',
			title: 'Featured image',
			name: 'featuredImage',
			fields: [
				defineField({
					type: 'image',
					title: 'Image',
					name: 'image',
					validation: Rule => Rule.required(),
					fields: [
						defineField({
							name: 'alt',
							type: 'alt'
						}),
					],
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
							title: 'Graphic',
							name: 'graphic',
							options: {
								collapsible: false
							},
							description: 'Used for graphics, if applicable'
						}),
					],
				}),
				defineField({
					type: 'imageVideoGraphic',
					title: 'Graphic',
					name: 'imageVideoGraphic',
				}),
			],
		}),
		defineField({
			type: 'richText',
			title: 'Introduction',
			name: 'introduction',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'object',
			title: 'Featured music',
			name: 'featuredMusic',
			fields: [
				defineField({
					type: 'reference',
					title: 'Music',
					name: 'music',
					to: [{ type: 'music' }],
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
							options: {
								collapsible: false
							},
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'colorPicker',
							title: 'Text',
							name: 'text',
							options: {
								collapsible: false
							},
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'colorPicker',
							title: 'Graphic',
							name: 'graphic',
							description: 'Used for graphics',
							options: {
								collapsible: false
							},
						}),
					],
				}),
			],
		}),
		defineField({
			type: 'object',
			title: 'Featured video',
			name: 'featuredVideo',
			fields: [
				defineField({
					type: 'reference',
					title: 'Video',
					name: 'video',
					to: [{ type: 'video' }],
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
							options: {
								collapsible: false
							},
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'colorPicker',
							title: 'Text',
							name: 'text',
							options: {
								collapsible: false
							},
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'colorPicker',
							title: 'Button',
							name: 'button',
							options: {
								collapsible: false
							},
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'colorPicker',
							title: 'Icon',
							name: 'icon',
							options: {
								collapsible: false
							},
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'colorPicker',
							title: 'Graphic',
							name: 'graphic',
							description: 'Used for graphics',
							options: {
								collapsible: false
							},
						}),
					],
				}),
			],
		}),
		defineField({
			type: 'array',
			name: 'featuredProjects',
			title: 'Featured projects',
			of: [
				defineArrayMember({
					type: 'reference',
					to: [
						{ type: 'project' },
						{ type: 'projectIntegrator' }
					]
				})
			],
			validation: Rule => Rule.required().unique()
		}),
		defineField({
			type: 'testimonialsA',
			name: 'testimonialsA',
			title: 'Testimonials',
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
	],
	preview: {
		prepare() {
			return {
				title: 'Home'
			}
		}
	}
})  