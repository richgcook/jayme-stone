<template>
	<div class="graphic" :class="{ '--repeat-pattern': repeatPattern }"></div>
</template>

<script setup>

const props = defineProps({
	fill: {
		type: String,
		default: 'var(--color-black)'
	},
	repeatPattern: {
		type: Boolean,
		default: false
	},
	index: {
    	type: Number,
    	default: 1
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
	&.--repeat-pattern {
		aspect-ratio: auto;
		background-repeat: repeat-y;
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