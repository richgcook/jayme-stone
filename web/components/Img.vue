<template>
	<img
		:src="src"
		:alt="alt"
		:data-orientation="orientation"
		:loading="lazy"
	/>
</template>

<script setup>

const props = defineProps({
	src: {
		type: String,
		required: true
	},
	alt: String,
	orientation: String,
	lazy: {
		type: String,
		default: 'lazy'
	},
	ratio: {
		type: Number,
		default: null
	}
})

</script>