<template>
	<div class="graphic" :class="{ '--cover': cover }">
		<div></div>
	</div>
</template>

<script setup>

const props = defineProps({
	bgColor: {
		type: String,
		default: 'var(--color-blue)'
	},
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
	pointer-events: none;
	aspect-ratio: 1 / 1;
	position: relative;
	background-color: v-bind(bgColor);
	&.--cover {
		height: 100%;
		width: 100%;
	}
	> div {
		mask-image:  v-bind(bgUrl(index));
		mask-repeat: no-repeat;
		mask-size: cover;
		mask-position: center;
		background-color: v-bind(fill);
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
	}
}

</style>