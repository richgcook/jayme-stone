import { defineType, defineField, defineArrayMember } from 'sanity'

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
					type: 'eventUpcoming',
					title: 'Event',
					name: 'event',
				}),
			]
		}),
		defineField({
			type: 'array',
			title: 'Performance highlights',
			name: 'eventsArchive',
			of: [
				defineArrayMember({
					type: 'eventArchiveCategory',
					title: 'Category',
					name: 'category',
				}),
			]
		}),
		defineField({
			type: 'newsletterSelection',
			name: 'newsletterSelection',
			title: 'Newsletter selection',
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	]
})