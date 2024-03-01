import { defineField, defineArrayMember } from 'sanity'
import { Quotes, ScribbleLoop, Circle } from '@phosphor-icons/react'

export default defineField({
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
					type: 'string',
					title: 'Text size',
					name: 'textSize',
					options: {
						list: [
							{ title: 'Large', value: 'lg' },
							{ title: 'XL', value: 'xl' },
						],
					},
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
						}),
					],
				}),
				defineField({
					type: 'boolean',
					title: 'Center text',
					name: 'centerText',
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
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'colorPicker',
							title: 'Text',
							name: 'text',
							validation: Rule => Rule.required()
						}),
					],
				}),
				defineField({
					type: 'number',
					title: 'Block width',
					name: 'blockWidth',
					description: 'How many columns to take up from 1 to 4',
					initialValue: 1,
					validation: Rule => Rule.required().min(1).max(4)
				}),
				defineField({
					type: 'number',
					title: 'Block height',
					name: 'blockHeight',
					description: 'If your block needs to exceed one row in height, please indicate the number of rows required',
				}),
			],
			preview: {
				select: {
					text: 'text',
					name: 'referrer.name',
					media: 'referrer.image',
					blockWidth: 'blockWidth',
				},
				prepare(selection) {
					const { name, text, media, blockWidth } = selection
					return {
						title: text ? text[0].children[0].text.substring(0, 50) + '...' : '',
						subtitle: `${blockWidth}/4`,
						media: media ? media : Quotes
					}
				}
			}
		}),
		defineArrayMember({
			type: 'object',
			title: 'Graphic',
			name: 'graphic',
			fields: [
				defineField({
					type: 'number',
					title: 'Block width',
					name: 'blockWidth',
					description: 'How many columns to take up from 1 to 4',
					initialValue: 1,
					validation: Rule => Rule.required().min(1).max(4)
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
							validation: Rule => Rule.required()
						}),
					],
				}),
			],
			preview: {
				select: {
					blockWidth: 'blockWidth',
					color: 'colors.bg.hex',
				},
				prepare(selection) {
					const { blockWidth, color } = selection
					return {
						title: 'Graphic',
						subtitle: `${blockWidth}/4`,
						media: () => <ScribbleLoop color={ color } weight="bold" />
					}
				}
			}
		}),
	]
})