<template>
	<div class="events-overview">
		<PageHeader :title="data.eventsPage.title" />
		<div class="upcoming-events" v-if="hasUpcomingEvents">
			<h2 class="title">Upcoming Dates</h2>
			<div class="events">
				<div v-for="(event, index) in data.eventsPage.upcomingEvents" :key="index" class="event">
					<div class="date">
						<h5>{{ event.dates }}</h5>
					</div>
					<div class="location">
						<RichText :blocks="event.location" />
					</div>
					<div class="details">
						<p v-if="event.details">{{ event.details }}</p>
					</div>
				</div>
			</div>
			<span class="script">{{ data.eventsPage.title }}</span>
		</div>
		<div class="events-archive" :class="{ '--no-upcoming-events': !hasUpcomingEvents }">
			<div class="graphic">
				<GraphicsRectangleY :index="4" :isFullColor="true" />
			</div>
			<div class="content">
				<TitleWithArrow 
					:arrowDirection="'next'" 
					:arrowPosition="'after'" 
					:lineLength="'100%'" 
					:color="`var(--color-green)`" 
					:label="`Performance Highlights`"
				/>
				<div class="events">
					<div v-for="(archive, index) in data.eventsPage.eventsArchive" :key="index" class="category">
						<h2>{{ archive.title }}</h2>
						<RichText :blocks="archive.events" />
					</div>
				</div>
			</div>
			<div class="graphic">
				<GraphicsRectangleY :index="5" :isFullColor="true" />
			</div>
		</div>
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
	meta: useCreateSeoMeta({
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
div.upcoming-events {
	padding: 0 7% 100px 7%;
	position: relative;
	overflow: hidden;
	@include media('tablet-portrait-and-phone') {
		padding: 0 30px 60px 30px;
	}
	h2.title {
		color: var(--color-green);
		&:after {
			content: '';
			display: block;
			height: 1px;
			width: 100%;
			background-color: white;
			margin: 25px 0;
		}
	}
	span.script {
		font-family: var(--font-family-script);
		color: var(--color-blue);
		position: absolute;
		bottom: 0;
		left: 0;
		transform: translate(100%, 50%);
		font-size: 60px;
		line-height: 1;
		text-transform: lowercase;
		pointer-events: none;
		@include media('tablet-portrait-and-phone') {
			display: none;
		}
	}
	div.events {
		div.event {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			@include media('tablet-portrait-and-phone') {
				grid-template-columns: 1fr;
				row-gap: 5px;
			}
			&:not(:last-child) {
				&:after {
					content: '';
					grid-column: 1 / -1;
					display: block;
					height: 1px;
					width: 100%;
					background-color: white;
					margin: 25px 0;
				}
			}
			div.date,
			div.details {
				font-family: var(--font-family-mono);
				font-size: var(--font-size-mono-sm);
			}
		}
	}
}
div.events-archive {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	background-color: white;
	@include media('tablet-portrait-and-phone') {
		grid-template-columns: 1fr;
	}
	&.--no-upcoming-events {
		margin-top: 50px;
		@include media('tablet-portrait-and-phone') {
			margin-top: 30px;
		}
	}
	> div.graphic {
		position: relative;
		@include media('tablet-portrait-and-phone') {
			aspect-ratio: 3 / 1;
		}
	}
	> div.content {
		grid-column: 2 / span 2;
		padding: 90px;
		display: grid;
		row-gap: 1.6em;
		@include media('tablet-landscape') {
			padding: 60px;
		}
		@include media('tablet-portrait-and-phone') {
			grid-column: 1 / -1;
			padding: 60px 30px;
		}
		div.events {
			display: grid;
			row-gap: 1.6em;
			div.category {
				div.text {
					font-family: var(--font-family-mono);
					font-size: var(--font-size-mono-md);
				}
			}
		}
	}
}

</style>