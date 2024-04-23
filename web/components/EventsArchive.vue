<template>
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
				<div v-for="(archive, index) in eventsByCategory" :key="index" class="category">
					<h2>{{ archive.title }}</h2>
					<RichText :blocks="archive.events" />
				</div>
			</div>
		</div>
		<div class="graphic">
			<GraphicsRectangleY :index="5" :isFullColor="true" />
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	eventsByCategory: Array,
	hasUpcomingEvents: {
		type: Boolean,
		default: true
	}
})

</script>

<style lang="scss" scoped>

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