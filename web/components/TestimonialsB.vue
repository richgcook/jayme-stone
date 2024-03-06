<template>
	<div>
		<TestimonialsHeader />
		<div class="testimonials-layout">
			<div class="graphic">
				<GraphicsRectangleY :index="6" :isFullColor="true" />
			</div>
			<div class="testimonials-sections">
				<TestimonialsBSection v-for="(section, index) in content" :key="index" :section="section" />
			</div>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	content: Array
})

</script>

<style scoped lang="scss">

div.testimonials-layout {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	@include media('phone') {
		grid-template-columns: 1fr;
	}
	div.graphic {
		@include media('phone') {
			display: none;
		}
	}
	div.testimonials-sections {
		grid-column: 2 / span 3;
		background-color: var(--color-beige);
		@include media('phone') {
			grid-column: 1 / -1;
		}
	}
}

</style>