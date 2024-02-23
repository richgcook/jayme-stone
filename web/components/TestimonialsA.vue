<template>
	<div>
		<TestimonialsHeader />
		<div class="testimonials-layout">
			<TestimonialA v-for="(testimonial, index) in content" :key="index" :testimonial="testimonial" />
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	content: Array
})

</script>

<style scoped lang="scss">



</style>