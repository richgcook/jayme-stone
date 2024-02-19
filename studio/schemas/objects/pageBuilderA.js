import { defineType, defineField, defineArrayMember } from 'sanity'
import { TextAlignLeft } from '@phosphor-icons/react'

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
			],
		}),
		defineArrayMember({
			type: 'object',
			title: 'Text',
			name: 'textBlock',
			fields: [
				defineField({
					type: 'richText',
					title: 'Text',
					name: 'text',
					validation: Rule => Rule.required()
				}),
				defineField({
					type: 'object',
					title: 'Button/link',
					name: 'button',
					description: 'Optional',
					fields: [
						defineField({
							type: 'string',
							title: 'Label',
							name: 'label',
						}),
						defineField({
							type: 'reference',
							title: 'Link',
							name: 'link',
							to: [{ type: 'pageA' }]
						}),
					],
				}),
				defineField({
					type: 'colorPicker',
					title: 'Highlight color',
					name: 'highlightColor',
					description: 'Used for graphics',
				}),
			],
			preview: {
				select: {
					text: 'text'
				},
				prepare(selection) {
					const { text } = selection
					return {
						title: 'Text',
						subtitle: text ? text[0].children[0].text.substring(0, 50) + '...' : '',
						media: TextAlignLeft
					}
				}
			}
		}),
	]
})