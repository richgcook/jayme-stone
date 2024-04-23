import { defineField } from 'sanity'
import { Calendar } from '@phosphor-icons/react'

export default defineField({
	type: 'object',
	title: 'Event',
	name: 'eventUpcoming',
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
})