import { TextAlignLeft, Play, YoutubeLogo, Video, Quotes } from '@phosphor-icons/react'
import { defineField, defineArrayMember } from 'sanity'
import { DocumentBasedPageBuilderBInput } from '../components/DocumentBasedPageBuilderBInput'

export default defineField({
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
			title: 'Video(s)',
			name: 'videosBlock',
			fields: [
				defineField({
					type: 'array',
					title: 'Videos',
					name: 'videos',
					of: [
						defineArrayMember({
							type: 'object',
							title: 'Embed',
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
									],
									validation: Rule => Rule.required()
								}),
								defineField({
									type: 'text',
									title: 'Embed code',
									name: 'embedCode',
									rows: 6,
									validation: Rule => Rule.required()
								}),
								defineField({
									type: 'string',
									title: 'Title',
									name: 'title',
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
											title: 'Button',
											name: 'button',
											validation: Rule => Rule.required()
										}),
										defineField({
											type: 'colorPicker',
											title: 'Icon',
											name: 'icon',
											validation: Rule => Rule.required()
										}),
									],
								}),
							],
							preview: {
								select: {
									title: 'title',
								},
								prepare(selection) {
									const { title } = selection
									return {
										title: 'Embed',
										subtitle: title,
										media: YoutubeLogo
									}
								},
							},
						}),
						defineArrayMember({
							type: 'object',
							title: 'Reference',
							name: 'videoRefBlock',
							fields: [
								defineField({
									type: 'reference',
									title: 'Video',
									name: 'video',
									to: [{ type: 'video' }],
									validation: Rule => Rule.required()
								}),
							],
							preview: {
								select: {
									videoTitle: 'video.title',
								},
								prepare(selection) {
									const { videoTitle } = selection
									return {
										title: 'Video reference',
										subtitle: videoTitle,
										media: Play
									}
								},
							},
						}),
					]
				}),
			],
			preview: {
				select: {
					videos: 'videos',
				},
				prepare(selection) {
					const { videos } = selection
					const videosLength = typeof videos == 'object' ? Object.keys(videos)?.length : videos?.length
					return {
						title: `${videosLength > 1 ? 'Videos' : 'Video'} (${videosLength})`,
						media: Video
					}
				},
			},
		}),
		defineArrayMember({
			type: 'object',
			title: 'Press',
			name: 'pressBlock',
			fields: [
				defineField({
					type: 'array',
					title: 'Press',
					name: 'press',
					of: [
						defineArrayMember({
							type: 'object',
							title: 'Press item',
							name: 'pressItem',
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
					]
				}),
			],
			preview: {
				select: {
					press: 'press',
				},
				prepare(selection) {
					const { press } = selection
					const pressLength = typeof press == 'object' ? Object.keys(press)?.length : press?.length
					return {
						title: `Press (${pressLength})`,
						media: Quotes
					}
				},
			},
		}),
	],
	components: {
    	input: DocumentBasedPageBuilderBInput,
    },
})