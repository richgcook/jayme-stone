<template>
	<div class="resources">
		<h2 class="section-title">Resources</h2>
		<div class="downloads">
			<NuxtLink :to="download.file" v-for="(download, index) in downloads" :key="index" target="_blank" class="download">
				<div>{{ download.title }}</div>
				<div>
					<div class="download">
						<SymbolDownload :fill="`var(--color-red)`" />
					</div>
				</div>
			</NuxtLink>
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
	grid-template-columns: repeat(3, 1fr);
	gap: 40px;
	@include media('tablet-portrait-and-phone') {
		grid-template-columns: 1fr;
		gap: 15px;
	}
	a.download {
		display: block;
		height: 85px;
		background-color: var(--color-blue);
		font-family: var(--font-family-mono);
		font-size: var(--font-size-mono-caps);
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-beige);
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		column-gap: 10px;
		padding: 0 15px 0 25px;
		@include media('phone') {
			height: 50px;
			padding: 0 10px 0 15px;
		}
		&:hover {
			div.download {
				background-color: var(--color-pink);
				svg {
					fill: var(--color-black);
				}
			}
		}
		div.download {
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

</style>