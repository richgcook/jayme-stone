<template>
	<div>
		<TestimonialsHeader v-if="includeHeader" />
		<div class="testimonials-layout">
			<template v-for="(block, index) in content">
				<TestimonialA :testimonial="block" :key="index" v-if="block._type == 'testimonial'" />
				<GraphicsSquare :bgColor="block.colors?.bg?.hex" :cover="true" :index="Number(block.squareGraphic)" :key="index" :context="'testimonials'" :class="{ '--hidden-xs': shouldHideWhenStacked(index) }" v-if="block._type == 'graphic'" />
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

const shouldHideWhenStacked = (index) => {
	const currentBlock = props.content[index]
    const prevBlock = props.content[index - 1]
    if (currentBlock._type === 'graphic' && prevBlock && prevBlock._type === 'graphic') {
		return true
	}
	return false
}

</script>

<style scoped lang="scss">

div.testimonials-layout {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	@include media('tablet-portrait-and-phone') {
		grid-template-columns: 1fr;
	}
	> * {
		&.--hidden-xs {
			@include media('tablet-portrait-and-phone') {
				display: none;
			}
		}
	}
}

</style>