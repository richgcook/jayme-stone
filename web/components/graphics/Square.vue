<template>
	<div class="graphic" :class="{ '--cover': cover }"></div>
</template>

<script setup>

const props = defineProps({
	fill: {
		type: String,
		default: 'var(--color-black)'
	},
	index: {
    	type: Number,
    	default: 1
  	},
	cover: {
		type: Boolean,
		default: false
	}
})

const bgUrl = (i) => `url('/graphics/square-${i.toString().padStart(2, '0')}.png')`

</script>

<style scoped lang="scss">

div.graphic {
	aspect-ratio: 1 / 1;
	background-image: v-bind(bgUrl(index));
	background-repeat: no-repeat;
	background-size: contain;
	position: relative;
	&.--cover {
		background-size: cover;
		height: 100%;
		width: 100%;
	}
	&::after {
		content: '';
		display: block;
		background-color: v-bind(fill);
		mix-blend-mode: lighten;
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
		z-index: 1;
	}
}

</style>