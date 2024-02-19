import { defineType, defineField, defineArrayMember } from 'sanity'
import { TextAlignLeft } from '@phosphor-icons/react'

export default defineType({
	type: 'array',
	name: 'testimonialsA',
	title: 'Testimonials',
	of: [
		defineArrayMember({
			type: 'object',
			title: 'Testimonial',
			name: 'testimonial',
			fields: [
				defineField({
					type: 'richText',
					title: 'Text',
					name: 'text',
					validation: Rule => Rule.required()
				}),
				defineField({
					type: 'object',
					title: 'Referrer',
					name: 'referrer',
					fields: [
						defineField({
							type: 'string',
							title: 'Name',
							name: 'name',
							validation: Rule => Rule.required()
						}),
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
					],
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
			],
			preview: {
				select: {
					text: 'text',
					name: 'referrer.name',
					media: 'referrer.image',
				},
				prepare(selection) {
					const { name, text, media } = selection
					return {
						title: text ? text[0].children[0].text.substring(0, 50) + '...' : '',
						subtitle: name,
						media: media
					}
				}
			}
		}),
	]
})