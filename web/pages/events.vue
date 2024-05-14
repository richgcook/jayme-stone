<template>
	<div class="events-overview">
		<PageHeader :title="data.eventsPage.title" />
		<EventsUpcoming :events="data.eventsPage.upcomingEvents" :eventsPage="data.eventsPage" v-if="hasUpcomingEvents" />
		<EventsArchive :eventsByCategory="data.eventsPage.eventsArchive" :hasUpcomingEvents="hasUpcomingEvents" v-if="data.eventsPage.eventsArchive?.length" />
		<NewsletterSignup :title="data.eventsPage.newsletterSelection?.active ? data.eventsPage.newsletterSelection.title : undefined" :segmentId="data.eventsPage.newsletterSelection?.segment" />
	</div>
</template>

<script setup>

const { $seoQuery, $richTextQuery } = useNuxtApp()

const query = groq`{ 

	"eventsPage": *[_type == "eventsPage"] {
		_id, title, slug, seo {
			${$seoQuery}
		},
		upcomingEvents[dateTime(endDate + "T23:59:59Z") >= dateTime(now())] {
			dates, endDate,
			location[] {
				${$richTextQuery}
			},
			details
		},
		eventsArchive[] {
			title, 
			events[] {
				${$richTextQuery}
			},
		},
		newsletterSelection
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.eventsPage)

useHead({
	title: title.value,
	meta: useSeoFields({
		title: title.value,
		description: description.value,
		image: image.value
	}),
	bodyAttrs: {
		class: bodyClass.value
	}
})

const hasUpcomingEvents = data?.value?.eventsPage?.upcomingEvents?.length

</script>

<style lang="scss" scoped>

div.events-overview {
	background-color: var(--color-beige);
}

</style>