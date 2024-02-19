<template>
	<div class="video-player">
		<button @click="playing = true" v-show="!playing"><SymbolPlay :fill="'var(--color-primary)'" /></button>
		<video playsinline @ended="ended()" ref="video">
			<source :src="src" type="video/mp4">
		</video>
	</div>
</template>

<script setup>

const props = defineProps({
	src: String,
})

const playing = ref(false)

function ended() {
	playing.value = false
}

const video = ref(null)

watch(playing, (newValue, oldValue) => {
	if (newValue) {
		video.value.play()
		video.value.controls = true
	} else {
		video.value.pause()
		video.value.currentTime = 0
		video.value.controls = false
	}
})

</script>

<style lang="scss" scoped>

div.video-player {
	position: relative;
	button {
		all: unset;
		box-sizing: border-box;
		cursor: pointer;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
		display: block;
		height: 100px;
		width: 100px;
		@include media('tablet-portrait') {
			height: 80px;
			width: 80px;
		}
		@include media('phone') {
			height: 64px;
			width: 64px;
		}
	}
	video {
		height: 100%;
		width: 100%;
	}
}

</style>