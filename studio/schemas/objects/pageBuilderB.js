import { TextAlignLeft, Play, YoutubeLogo, SpeakerHigh } from '@phosphor-icons/react'
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
	type: 'array',
	name: 'pageBuilderB',
	title: 'Page builder',
	of: [
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
		defineArrayMember({
			type: 'object',
			title: 'Image',
			name: 'imageBlock',
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
					type: 'richText',
					title: 'Caption',
					name: 'caption'
				}),
			],
			preview: {
				select: {
					caption: 'caption',
					media: 'image'
				},
				prepare(selection) {
					const { caption, media } = selection
					return {
						title: 'Image',
						subtitle: caption ? caption[0].children[0].text.substring(0, 50) + '...' : '',
						media: media
					}
				},
			},
		}),
		defineArrayMember({
			type: 'object',
			title: 'Video',
			name: 'videoBlock',
			fields: [
				defineField({
					type: 'file',
					title: 'Video',
					name: 'video',
					options: {
						accept: '.mp4'
					},
					validation: Rule => Rule.required()
				}),
				defineField({
					type: 'richText',
					title: 'Caption',
					name: 'caption',
				}),
			],
			preview: {
				select: {
					caption: 'caption',
				},
				prepare(selection) {
					const { caption } = selection
					return {
						title: 'Video',
						subtitle: caption ? caption[0].children[0].text.substring(0, 50) + '...' : '',
						media: Play
					}
				},
			},
		}),
		defineArrayMember({
			type: 'object',
			title: 'Audio',
			name: 'audioBlock',
			fields: [
				defineField({
					type: 'file',
					title: 'Audio',
					name: 'audio',
					options: {
						accept: '.mp3'
					},
					validation: Rule => Rule.required()
				}),
				defineField({
					type: 'richText',
					title: 'Caption',
					name: 'caption'
				}),
			],
			preview: {
				select: {
					caption: 'caption',
				},
				prepare(selection) {
					const { caption } = selection
					return {
						title: 'Audio',
						subtitle: caption ? caption[0].children[0].text.substring(0, 50) + '...' : '',
						media: SpeakerHigh
					}
				}
			}
		}),
		defineArrayMember({
			type: 'object',
			title: 'Media embed',
			name: 'embedBlock',
			fields: [
				defineField({
					type: 'image',
					title: 'Cover/thumbnail image',
					name: 'coverImage',
					fields: [
						defineField({
							name: 'alt',
							type: 'alt'
						}),
					]
				}),
				defineField({
					type: 'text',
					title: 'Embed code',
					name: 'embedCode',
					rows: 6
				}),
				defineField({
					type: 'richText',
					title: 'Caption',
					name: 'caption',
				}),
			],
			preview: {
				select: {
					caption: 'caption',
				},
				prepare(selection) {
					const { caption } = selection
					return {
						title: 'Embed',
						subtitle: caption ? caption[0].children[0].text.substring(0, 50) + '...' : '',
						media: YoutubeLogo
					}
				},
			},
		}),
	]
})