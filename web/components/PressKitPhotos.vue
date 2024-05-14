<template>
	<div class="photos">
		<h2 class="section-title">Photos</h2>
		<div class="downloads">
			<div v-for="(download, index) in downloads" :key="index" class="download">
				<NuxtLink :to="download.file" class="image">
					<Img
						:src="download.image.asset.url"
						:alt="download.image.alt"
					/>
				</NuxtLink>
				<div class="text">
					<div>
						<h3>{{ download.title }}</h3>
						<h4 v-if="download.credits">{{ download.credits }}</h4>
					</div>
					<div>
						<NuxtLink :to="download.file" class="download"><SymbolDownload :fill="`var(--color-red)`" /></NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	downloads: Array
})

</script>

<style lang="scss" scoped>

div.downloads {
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 40px;
	@include media('tablet-landscape') {
		grid-template-columns: repeat(4, 1fr);
	}
	@include media('tablet-portrait') {
		grid-template-columns: repeat(3, 1fr);
	}
	@include media('phone') {
		grid-template-columns: 1fr 1fr;
		gap: 30px 15px;
	}
	div.download {
		a.image {
			display: block;
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
		div.text {
			font-family: var(--font-family-mono);
			font-size: var(--font-size-mono-sm);
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			column-gap: 10px;
			margin-top: 10px;
			@include media('phone') {
				column-gap: 15px;
			}
			a.download {
				display: block;
				position: relative;
				height: 40px;
				width: 40px;
				background-color: white;
				border-radius: 50%;
				@include media('tablet-portrait-and-phone') {
					height: 30px;
					width: 30px;
				}
				&:hover {
					background-color: var(--color-pink);
					svg {
						fill: var(--color-black);
					}
				}
				svg {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					height: 19px;
					@include media('tablet-portrait-and-phone') {
						height: 13px;
					}
				}
			}
		}
	}
}

</style>