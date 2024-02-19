<template>
	<div class="image">
		<Img 
			:src="src"
			:alt="alt"
		/>
	</div>
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

<style scoped lang="scss">

div.image {
	position: relative;
	@supports (aspect-ratio: 1 / 1) {
		aspect-ratio: v-bind(ratio);
	}
	img {
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
	}
}

</style>