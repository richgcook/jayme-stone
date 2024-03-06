<template>
	<div class="audio-player">
		<audio ref="audio" @timeupdate="timeupdate" @ended="ended">
			<source :src="src" :type="mimeType">
		</audio>
		<div class="controls">
			<button class="play-pause" @click="playPause">
				<SymbolPlay class="--play" :fill="'var(--color-green)'" v-show="!playing" />
				<SymbolPause class="--pause" :fill="'var(--color-green)'" v-show="playing" v-cloak />
			</button>
		</div>
	</div>
</template>

<script setup>

import { useProducerTracksStore } from '~/store/producerTracks'
import { storeToRefs } from 'pinia'

const producerTracksStore = useProducerTracksStore()

const { getCurrentlyPlayingTrackId } = storeToRefs(producerTracksStore)
const { setCurrentlyPlayingTrackId } = producerTracksStore

const props = defineProps({
	id: String,
	src: String,
	mimeType: String,
})

const emit = defineEmits()

const audio = ref(null)

const duration = ref(0)
const progress = ref(0)
const playing = ref(false)

const loaded = () => {
	duration.value = Math.round(audio.value.duration)
}

const playPause = () => {
	if (audio.value.paused) {
		audio.value.play()
		playing.value = true
		setCurrentlyPlayingTrackId(props.id)
	} else {
		audio.value.pause()
		playing.value = false
	}
}

watch(getCurrentlyPlayingTrackId, (trackId) => {
	if (trackId !== props.id && playing.value) {
		audio.value.pause()
		playing.value = false
	}
})

const timeupdate = () => {
	progress.value = audio.value.currentTime
}

const ended = () => {
	playing.value = false
}

onMounted(() => {
	if (audio.value.readyState > 0) {
		loaded()
	} else {
    	audio.value.addEventListener('loadedmetadata', loaded)
	}
})

</script>

<style lang="scss" scoped>

div.audio-player {
	audio {
		display: none;
	}
	div.controls {
		button.play-pause {
			all: unset;
			box-sizing: border-box;
			cursor: pointer;
			position: relative;
			display: block;
			background-color: var(--color-black);
			height: 200px;
			width: 200px;
			border-radius: 50%;
			@include media('phone') {
				height: 70px;
				width: 70px;
			}
			svg {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-25%, -50%);
				height: 60px;
				@include media('phone') {
					height: 26px;
				}
				&.--pause {
					transform: translate(-50%, -50%);
				}
			}
		}
	}
}


</style>