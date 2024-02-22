<template>
	<div class="graphic"></div>
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
  	}
})

const bgUrl = (i) => `url('/graphics/rectangle-y-${i.toString().padStart(2, '0')}.png')`

</script>

<style scoped lang="scss">

div.graphic {
	background-image: v-bind(bgUrl(index));
	background-repeat: repeat-y;
	background-size: 100%;
	position: relative;
	height: 100%;
	width: 100%;
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