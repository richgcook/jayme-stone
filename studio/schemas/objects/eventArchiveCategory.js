import { defineField } from 'sanity'
import { Playlist } from '@phosphor-icons/react'

export default defineField({
	type: 'object',
	title: 'Category',
	name: 'eventArchiveCategory',
	fields: [
		defineField({
			type: 'string',
			title: 'Title',
			name: 'title',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'richText',
			title: 'Events',
			name: 'events',
		}),
	],
	preview: {
		select: {
			title: 'title',
			events: 'events'
		},
		prepare(selection) {
			const { title, events } = selection
			return {
				title: title,
				subtitle: events ? events[0].children[0].text.substring(0, 50) + '...' : '',
				media: Playlist
			}
		}
	}
})