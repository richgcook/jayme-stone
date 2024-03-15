<template>
	<div class="track">
		<div class="image-controls">
			<div class="image">
				<Img :src="track.image.asset.url" :alt="track.image.asset.alt" />
			</div>
			<div>
				<AudioPlayer 
					:src="track.file.url" 
					:mimeType="track.file.mimeType" 
					:id="track.file._id" 
				/> 
			</div>
		</div>
		<div class="titles">
			<h3>{{ track.title }}</h3>
			<h4>{{ track.artists }}</h4>
		</div>
		<div class="role">
			<p><span>Role:</span> {{ track.role }}</p>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	track: Object
})

</script>

<style lang="scss" scoped>

div.track {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	column-gap: 50px;
	max-width: 1400px;
    margin: 0 auto;
	@include media('tablet-portrait-and-phone') {
		grid-template-columns: 1fr;
	}
	&:not(:last-child) {
		&:after {
			content: '';
			grid-column: 1 / -1;
			display: block;
			height: 1px;
			width: 100%;
			background-color: var(--color-blue);
			margin: 25px 0;
			@include media('tablet-portrait-and-phone') {
				margin: 15px 0 25px 0;
			}
		}
	}
	div.image-controls {
		display: grid;
		grid-template-columns: 200px 200px;
		column-gap: 25px;
		@include media('tablet-portrait') {
			grid-template-columns: 1fr 1fr;
			align-items: center;
		}
		@include media('phone') {
			grid-template-columns: 1fr auto;
			align-items: center;
			column-gap: 15px;
		}
		div.image {
			position: relative;
			@supports (aspect-ratio: 1 / 1) {
				aspect-ratio: 1 / 1;
			}
			@supports not (aspect-ratio: 1 / 1) {
				padding-bottom: calc(1 / 1 * 100%);
			}
			img {
				position: absolute;
				inset: 0;
				height: 100%;
				width: 100%;
				object-fit: cover;
			}
		}
	}
	div.titles {
		padding-top: 40px;
		@include media('tablet-portrait-and-phone') {
			padding-top: 15px;
		}
		h3 {
			color: var(--color-beige);
		}
		h4 {
			color: var(--color-pink);
		}
	}
	div.role {
		padding-top: 40px;
		color: var(--color-beige);
		@include media('tablet-portrait-and-phone') {
			padding-top: 5px;
		}
		span {
			font-family: var(--font-family-mono);
			font-size: var(--font-size-mono-caps);
			letter-spacing: 0.05em;
			text-transform: uppercase;
			color: var(--color-yellow);
		}
	}
}

</style>