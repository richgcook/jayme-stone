import { defineType, defineField, defineArrayMember } from 'sanity'
import { TextAlignLeft, Layout } from '@phosphor-icons/react'

export default defineType({
	type: 'array',
	name: 'pageBuilderA',
	title: 'Content',
	of: [
		defineArrayMember({
			type: 'object',
			title: 'Image / Text',
			name: 'imageTextBlock',
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
					type: 'string',
					title: 'Title',
					name: 'title',
					description: 'Optional'
				}),
				defineField({
					type: 'richText',
					title: 'Text',
					name: 'text',
					validation: Rule => Rule.required()
				}),
				defineField({
					type: 'string',
					title: 'Image/text orientation',
					name: 'orientation',
					options: {
						list: [
							{ title: 'Image / Text', value: 'odd' },
							{ title: 'Text / Image', value: 'even' },
						],
					},
					initialValue: 'odd',
					validation: Rule => Rule.required()
				}),
			],
			preview: {
				select: {
					text: 'text',
					media: 'image',
					orientation: 'orientation',
				},
				prepare(selection) {
					const { text, media, orientation } = selection
					return {
						title: orientation === 'odd' ? 'Image / Text' : 'Text / Image',
						subtitle: text ? text[0].children[0].text.substring(0, 50) + '...' : '',
						media: media
					}
				}
			}
		}),
		defineArrayMember({
			type: 'object',
			title: 'Content column',
			name: 'contentColumnBlock',
			fields: [
				defineField({
					type: 'pageBuilderB',
					title: 'Content',
					name: 'content',
				}),
				defineField({
					type: 'object',
					title: 'Colors',
					name: 'colors',
					options: {
						collapsible: true,
						collapsed: true
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
			preview: {
				select: {
					content: 'content'
				},
				prepare(selection) {
					const { content } = selection
					const contentLength = typeof content == 'object' ? Object.keys(content)?.length : content?.length
					return {
						title: `Content column (${contentLength} ${contentLength > 1 ? 'items' : 'item'})`,
						media: Layout
					}
				}
			}
		}),
	]
})