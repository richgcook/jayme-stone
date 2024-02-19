<template>
	<div class="audio-player">
		<audio ref="audio" @timeupdate="timeupdate" @ended="ended">
			<source :src="src">
		</audio>
		<input type="range" v-model="progress" @input="seekbarUpdated" min="0" :max="duration" ref="seekbar" :disabled="!playing">
		<div class="duration" v-if="!progress">{{ useFormatMediaDuration(duration) }}</div>
		<div class="duration" v-else>{{ useFormatMediaDuration(progress) }} </div>
		<div class="controls">
			<button class="play-pause" @click="playPause">
				<span class="play" v-show="!playing"><SymbolPlay :fill="'white'" /></span>
				<span class="pause" v-show="playing"><SymbolPause :fill="'white'" /></span>
			</button>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	id: String,
	src: String,
})

const emit = defineEmits()

const audio = ref(null)
const seekbar = ref(null)

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
	} else {
		audio.value.pause()
		playing.value = false
	}
}

const timeupdate = () => {
	progress.value = audio.value.currentTime
}

const seekbarUpdated = () => {
	audio.value.currentTime = progress.value
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
	display: flex;
    flex-flow: row nowrap;
	align-items: center;
	column-gap: calc(var(--padding-base) * 2);
	padding: calc((var(--padding-base) * 2) + var(--font-size-sm)) calc(var(--padding-base) * 2);
	width: 100%;
	background-color: var(--color-primary);
	position: relative;
	@include media('phone') {
		padding: calc(var(--padding-base) * 2) var(--padding-base);
	}
	audio {
		display: none;
	}
	div.controls {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		position: relative;
		button.play-pause {
			all: unset;
			cursor: pointer;
			display: block;
			height: 64px;
			width: 64px;
			position: relative;
			span {
				svg {
					height: 64px;
					width: 64px;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}
		}
	}
	input[type="range"] {
		all: unset;
		height: 3px;
		width: 100%;
		background-color: white;
		position: relative;
		&:hover {
			&::-webkit-slider-thumb {
				cursor: grab;
			}
			&::-moz-range-thumb {
				cursor: grab;
			}
		}
		&:active {
			&::-webkit-slider-thumb {
				cursor: grabbing;
			}
			&::-moz-range-thumb {
				cursor: grabbing;
			}
		}
		&::-webkit-slider-runnable-track,
		&::-webkit-slider-thumb {
			position: relative;
			-webkit-appearance: none;
			height: 20px;
			border: none;
		}
		&::-moz-range-track,
		&::-moz-range-thumb {
			position: relative;
			-moz-appearance: none;
			height: 20px;
			border: none;
		}
		&::-webkit-slider-thumb {
			width: 20px;
			background-color: white;
			border-radius: 50%;
		}
		&::-moz-range-thumb {
			width: 20px;
			background-color: white;
			border-radius: 50%;
		}
	}
	div.duration {
		position: absolute;
		bottom: calc(var(--padding-base) * 2);
		left: calc(var(--padding-base) * 2);
		font-size: var(--font-size-sm);
		color: white;
		@include media('phone') {
			bottom: var(--padding-base);
			left: var(--padding-base);
		}
	}
}


</style>