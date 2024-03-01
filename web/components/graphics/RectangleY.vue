<template>
	<div class="graphic" :class="{ '--full-color': isFullColor }">
		<div></div>
	</div>
</template>

<script setup>

const props = defineProps({
	bgColor: {
		type: String,
		default: 'var(--color-beige)'
	},
	fill: {
		type: String,
		default: 'var(--color-black)'
	},
	index: {
    	type: Number,
    	default: 1
  	},
	isFullColor: {
		type: Boolean,
		default: false
	}
})

const bgUrl = (i) => `url('/graphics/rectangle-y-${i.toString().padStart(2, '0')}.png')`

</script>

<style scoped lang="scss">

div.graphic {
	background-color: v-bind(bgColor);
	position: relative;
	height: 100%;
	width: 100%;
	&.--full-color {
		background-color: transparent;
		background-image: v-bind(bgUrl(index));
		background-repeat: repeat-y;
		background-size: 100%;
		> div {
			display: none;
		}
	}
	> div {
		mask-image:  v-bind(bgUrl(index));
		mask-repeat: repeat-y;
		mask-size: 100%;
		mask-position: 0 0;
		background-color: v-bind(fill);
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
	}
}

</style>