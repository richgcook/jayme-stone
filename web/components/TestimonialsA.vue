<template>
	<div>
		<TestimonialsHeader v-if="includeHeader" />
		<div class="testimonials-layout">
			<template v-for="(block, index) in content">
				<TestimonialA :testimonial="block" :key="index" v-if="block._type == 'testimonial'" />
				<GraphicsSquare :bgColor="block.colors?.bg?.hex" :cover="true" :index="Number(block.squareGraphic)" :key="index" v-if="block._type == 'graphic'" />
			</template>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	content: Array,
	includeHeader: {
		type: Boolean,
		default: true
	}
})

</script>

<style scoped lang="scss">

div.testimonials-layout {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	@include media('phone') {
		grid-template-columns: 1fr 1fr;
	}
}

</style>