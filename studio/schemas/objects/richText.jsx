import React from 'react'
import { defineField, defineArrayMember } from 'sanity'
import { Cards, FileArrowDown, HighlighterCircle } from '@phosphor-icons/react'
import { PAGE_REFERENCES } from '../../constants'

const HighlightDecorator = props => (
	<span style={{ color: 'red' }}>{props.children}</span>
)

const buttonRenderer = props => (
	<span style={{ backgroundColor: '#2276fc', color: 'white' }}>{props.renderDefault(props)}</span>
)

export default defineField({
	type: 'array',
	title: 'Text',
	name: 'richText',
	of: [
		defineArrayMember({ 
			type: 'block',
			styles: [
				{ title: 'Normal', value: 'normal' },
				{ title: 'H3', value: 'h3'}
			],
			lists: [
				{ title: 'Bullet', value: 'bullet' }
			],
			marks: {
				decorators: [
					{ title: 'Strong', value: 'strong' },
					{ title: 'Emphasis', value: 'em' },
					{ 
						title: 'Highlight',
						value: 'highlight',
						icon: HighlighterCircle,
						component: HighlightDecorator
					}
				],
				annotations: [
					{
						name: 'link',
						type: 'object',
						title: 'External link',
						fields: [
							defineField({
								name: 'href',
								type: 'url',
								title: 'URL',
								validation: Rule => Rule.uri({
									scheme: ['https', 'http', 'mailto', 'tel']
								})
							}),
							defineField({
								title: 'Open in new tab',
								name: 'blank',
								type: 'boolean'
							}),
							defineField({
								type: 'boolean',
								title: 'Style link as a button',
								name: 'button',
							}),
						],
					},
					{
						name: 'internalLink',
						type: 'object',
						title: 'Internal link',
						icon: Cards,
						fields: [
							defineField({
								name: 'reference',
								type: 'reference',
								title: 'Reference',
								to: PAGE_REFERENCES,
							}),
							defineField({
								type: 'boolean',
								title: 'Add link as a button',
								name: 'button',
							}),
						],
						components: {
							annotation: buttonRenderer
						}
					},
					{
						name: 'fileUploadLink',
						type: 'object',
						title: 'File upload',
						icon: FileArrowDown,
						fields: [
							defineField({
								type: 'file',
								title: 'File upload',
								name: 'file'
							}),
							defineField({
								type: 'boolean',
								title: 'Add link as a button',
								name: 'button',
							}),
						],
					},
				]
			}
		}),
	]
})