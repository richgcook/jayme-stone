<template>
	<div>
		<TestimonialsHeader />
		<div class="testimonials-layouts">
			<div>
				<GraphicsRectangleY :index="6" />
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

div.testimonials-layouts {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	div.testimonials-sections {
		grid-column: 2 / span 3;
		background-color: var(--color-beige);
	}
}

</style>