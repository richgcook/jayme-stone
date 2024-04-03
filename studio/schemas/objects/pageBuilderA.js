import { defineField, defineArrayMember } from 'sanity'
import { Layout, Folders, Images, Files, ShareNetwork } from '@phosphor-icons/react'
import { DocumentBasedPageBuilderAInput } from '../components/DocumentBasedPageBuilderAInput'

export default defineField({
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
							title: 'Graphic',
							name: 'graphic',
							description: 'Used for graphics',
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
		defineArrayMember({
			type: 'object',
			title: 'Press kit',
			name: 'pressKitBlock',
			fields: [
				defineField({
					type: 'array',
					title: 'Content',
					name: 'content',
					of: [
						defineArrayMember({
							type: 'object',
							title: 'Photos',
							name: 'photosBlock',
							fields: [
								defineField({
									type: 'pressKitPhotos',
									title: 'Photos',
									name: 'photos',
								}),
							],
							preview: {
								select: {
									photos: 'photos',
								},
								prepare(selection) {
									const { photos } = selection
									const photosLength = typeof photos == 'object' ? Object.keys(photos)?.length : photos?.length
									return {
										title: `Photos (${photosLength})`,
										media: Images
									}
								},
							},
						}),
						defineArrayMember({
							type: 'object',
							title: 'Resources',
							name: 'resourcesBlock',
							fields: [
								defineField({
									type: 'pressKitResources',
									title: 'Resources',
									name: 'resources',
								}),
							],
							preview: {
								select: {
									resources: 'resources',
								},
								prepare(selection) {
									const { resources } = selection
									const resourcesLength = typeof resources == 'object' ? Object.keys(resources)?.length : resources?.length
									return {
										title: `Resources (${resourcesLength})`,
										media: Files
									}
								},
							},
						}),
						defineArrayMember({
							type: 'object',
							title: 'Links',
							name: 'contactBlock',
							fields: [
								defineField({
									type: 'pressKitContact',
									title: 'Contact',
									name: 'contact',
								}),
							],
							preview: {
								select: {
									contact: 'contact',
								},
								prepare(selection) {
									const { contact } = selection
									const contactLength = typeof contact == 'object' ? Object.keys(contact)?.length : contact?.length
									return {
										title: `Links (${contactLength})`,
										media: ShareNetwork
									}
								},
							},
						}),
					]
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
						title: `Press kit (${contentLength} ${contentLength > 1 ? 'items' : 'item'})`,
						media: Folders
					}
				}
			}
		}),
	],
	components: {
    	input: DocumentBasedPageBuilderAInput,
    },
})