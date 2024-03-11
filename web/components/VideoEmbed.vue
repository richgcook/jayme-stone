<template>
	<div class="video-embed" :class="{ '--overview': isOverview }">
		<div class="poster" v-show="!playInitiated">
			<TitleWithArrow 
				:arrowDirection="'next'" 
				:arrowPosition="'after'" 
				:lineLength="'100%'" 
				:color="`var(--color-pink)`" 
				:label="pageTitle"
				v-if="isOverview && isFirst && pageTitle"
			/>
			<Img :src="poster.asset.url" :alt="poster.alt" v-if="poster" />
			<button @click="playInitiated = true" :class="{ '--sm': size == 'sm' }"><SymbolPlay :fill="iconColor" /></button>
			<h3 class="title" v-if="isOverview && title">{{ title }}</h3>
		</div>
		<div class="embed" ref="embed" v-show="playInitiated">
			<TitleWithArrow 
				:arrowDirection="'next'" 
				:arrowPosition="'after'" 
				:lineLength="'100%'" 
				:color="`var(--color-pink)`" 
				:label="pageTitle"
				v-if="isOverview && isFirst && pageTitle"
			/>
			<div v-html="html" ref="embedHtml"></div>
			<h3 class="title" v-if="isOverview && title">{{ title }}</h3>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	poster: Object,
	html: String,
	buttonColor: String,
	iconColor: String,
	size: String,
	isOverview: {
		type: Boolean,
		default: false
	},
	title: String,
	isFirst: {
		type: Boolean,
		default: false
	},
	pageTitle: String
})

const embed = ref(null)
const embedHtml = ref(null)

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
	&.--overview {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		height: 100%;
  		width: 100%;
		div.poster, div.embed {
			max-height: 60%;
			max-width: 80%;
			@include media('phone') {
				max-width: calc(100% - (30px * 2));
			}
			@media (orientation: landscape) {
				height: 60%;
			}
			@media (orientation: portrait) {
				width: 80%;
				@include media('phone') {
					width: 100%;
				}
			}
			:deep(h3.title-arrow) {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				transform: translateY(-100%) translateY(-20px);
			}
			:deep(h3.title) {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				transform: translateY(100%) translateY(10px);
			}
		}
		div.embed {
			> div {
				position: absolute;
				inset: 0;
				height: 100%;
				width: 100%;
			}
		}
	}
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
			background-color: v-bind(buttonColor);
			height: 100px;
			width: 100px;
			border-radius: 50%;
			@include media('phone') {
				height: 70px;
				width: 70px;
			}
			&:hover {
				background-color: v-bind(iconColor);
				svg {
					fill: v-bind(buttonColor);
				}
			}
			svg {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-30%, -50%);
				height: 30px;
				@include media('phone') {
					height: 26px;
				}
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