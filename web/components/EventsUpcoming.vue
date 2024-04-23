<template>
	<div class="upcoming-events">
		<h2 class="title">Upcoming Dates</h2>
		<div class="events">
			<div v-for="(event, index) in events" :key="index" class="event">
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
		<span class="script">{{ eventsPage ? eventsPage.title : `Events` }}</span>
	</div>
</template>

<script setup>

const props = defineProps({
	events: Array,
	eventsPage: Object
})

</script>

<style lang="scss" scoped>

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

</style>