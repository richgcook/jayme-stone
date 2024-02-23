import { defineType, defineField, defineArrayMember } from 'sanity'
import { Quotes } from '@phosphor-icons/react'

export default defineType({
	type: 'array',
	name: 'testimonialsB',
	title: 'Testimonials',
	of: [
		defineArrayMember({
			type: 'object',
			title: 'Section',
			name: 'testimonialBlock',
			fields: [
				defineField({
					type: 'string',
					title: 'Title',
					name: 'title',
					validation: Rule => Rule.required()
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
				defineField({
					type: 'colorPicker',
					title: 'Line color',
					name: 'lineColor',
					validation: Rule => Rule.required()
				}),
				defineField({
					type: 'array',
					title: 'Testimonials',
					name: 'testimonials',
					of: [
						defineArrayMember({
							type: 'object',
							title: 'Testimonial',
							name: 'testimonial',
							fields: [
								defineField({
									type: 'text',
									title: 'Text',
									name: 'text',
									rows: 2,
									validation: Rule => Rule.required()
								}),
								defineField({
									type: 'string',
									title: 'Referrer',
									name: 'referrerName',
									validation: Rule => Rule.required()
								}),
							],
							preview: {
								select: {
									text: 'text',
									referrerName: 'referrerName'
								},
								prepare(selection) {
									const { text, referrerName } = selection
									return {
										title: text,
										subtitle: referrerName,
										media: Quotes
									}
								}
							}
						}),
					],
				}),
			],
			preview: {
				select: {
					title: 'title'
				},
				prepare(selection) {
					const { title } = selection
					return {
						title: title,
						media: Quotes
					}
				}
			}
		}),
	]
})