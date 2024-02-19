import { defineType, defineField, defineArrayMember } from 'sanity'
import { Calendar, Playlist } from '@phosphor-icons/react'

export default defineType({
	type: "document",
	title: "Events",
	name: "eventsPage",
	fields: [
		defineField({
			type: 'string',
			title: 'Title',
			name: 'title',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'slug',
			title: 'Slug',
			name: 'slug',
			options: {
				source: 'title'
			},
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'array',
			title: 'Upcoming events',
			name: 'upcomingEvents',
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Event',
					name: 'event',
					fields: [
						defineField({
							type: 'string',
							title: 'Date(s)',
							name: 'dates',
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'date',
							title: 'End date',
							name: 'endDate',
							options: {
								dateFormat: 'MM.DD.YYYY',
								calendarTodayLabel: 'Today'
							},
							description: 'After this date the event will no longer be visible',
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'richText',
							title: 'Location',
							name: 'location',
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'string',
							title: 'Details',
							name: 'details',
						}),
					],
					preview: {
						select: {
							location: 'location',
							dates: 'dates'
						},
						prepare(selection) {
							const { location, dates } = selection
							return {
								title: location ? location[0].children[0].text.substring(0, 50) + '...' : '',
								subtitle: dates,
								media: Calendar
							}
						}
					}
				}),
			]
		}),
		defineField({
			type: 'array',
			title: 'Performance highlights',
			name: 'eventsArchive',
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Category',
					name: 'category',
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
				}),
			]
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	]
})