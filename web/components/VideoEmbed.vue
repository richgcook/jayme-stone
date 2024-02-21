<template>
	<div class="video-embed">
		<div class="poster" v-show="!playInitiated">
			<Img 
				:src="poster.asset.url"
				:alt="poster.alt"
				v-if="poster"
			/>
			<button @click="playInitiated = true" :class="{ '--sm': size == 'sm' }"><SymbolPlay :fill="secondaryColor" /></button>
		</div>
		<div class="embed" v-html="html" ref="embed" v-show="playInitiated"></div>
	</div>
</template>

<script setup>

const props = defineProps({
	poster: Object,
	html: String,
	primaryColor: String,
	secondaryColor: String,
	size: String
})

const embed = ref(null)

const playInitiated = ref(false)

const embedAspectRatio = () => {
	const iframe = embed.value.querySelector('iframe')
	const iframeHeight = iframe.getAttribute('height')
	const iframeWidth = iframe.getAttribute('width')
	if (window.CSS && CSS.supports && CSS.supports('aspect-ratio: 16/9')) {
    	embed.value.style.aspectRatio = `${iframeWidth} / ${iframeHeight}`;
	} else {
    	embed.value.style.paddingBottom = `${(iframeHeight / iframeWidth) * 100}%`;
	}
}

onMounted(() => {
	embedAspectRatio()
})

</script>

<style scoped lang="scss">

div.video-embed {
	div.poster {
		position: relative;
		@supports (aspect-ratio: 1 / 1) {
			aspect-ratio: 16 / 9;
		}
		@supports not (aspect-ratio: 1 / 1) {
			padding-bottom: calc(9 / 16 * 100%);
		}
		img {
			object-fit: cover;
			position: absolute;
			inset: 0;
			height: 100%;
			width: 100%;
		}
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
			background-color: v-bind(primaryColor);
			height: 200px;
			width: 200px;
			border-radius: 50%;
			&.--sm {
				height: 100px;
				width: 100px;
				svg {
					height: 30px;
				}
			}
			@include media('phone') {
				height: 100px;
				width: 100px;
			}
			svg {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-25%, -50%);
				height: 60px;
			}
		}
	}
	div.embed {
		position: relative;
		:deep(iframe) {
			width: 100%;
			&[src*="youtube.com"],
			&[src*="vimeo.com"] {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}
	}
}

</style>