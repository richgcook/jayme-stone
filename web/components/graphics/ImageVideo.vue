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
  	},
	position: {
		type: String,
		default: 'left'
	}
})

const bgUrl = (i) => `url('/graphics/image-video-overlay-${i.toString().padStart(2, '0')}.png')`
const position = computed(() => {
	if (props.position == 'left') {
		return 'center left'
	} else if (props.position == 'right') {
		return 'center right'
	} else {
		return 'left top'
	}
})
const rotate = computed(() => {
	if (props.position == 'top') {
		return 'rotate(90deg)'
	} else if (props.position == 'bottom') {
		return 'rotate(-90deg)'
	} else {
		return 'rotate(0)'
	}
})

</script>

<style scoped lang="scss">

div.graphic {
	pointer-events: none;
	background-color: v-bind(fill);
	mask-image: v-bind(bgUrl(index));
	mask-repeat: no-repeat;
	mask-size: contain;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	mask-position: v-bind(position);
	transform: v-bind(rotate);
}

</style>