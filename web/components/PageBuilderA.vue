<template>
	<div class="blocks-layout">

		<div v-for="(block, index) in content" :key="index" class="block" ref="blocks" :data-type="useBlockType(block._type)">

			<div v-if="useBlockType(block._type) == 'text'">
				<RichText :blocks="block.text" />
			</div>

			<div v-else-if="useBlockType(block._type) == 'image'">
				<div class="image-container">
					<ImgWithRatio 
						:src="block.image.asset.url"
						:alt="block.image.asset.alt"
						:ratio="block.image.asset.ratio"
					/>
				</div>
				<RichText :blocks="block.caption" />
			</div>

		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	content: Array
})

</script>

<style lang="scss" scoped>

div.blocks-layout {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: calc(var(--padding-base) * 4) var(--padding-base);
	padding: 0 var(--padding-base);
	@include media('phone') {
		grid-template-columns: 1fr;
		gap: calc(var(--padding-base) * 2) var(--padding-base);
	}
	> div.block {
		&[data-type="text"] {
			grid-column: 6 / span 6;
			@include media('phone') {
				grid-column: 1 / -1;
			}
		}
		&[data-type="image"] {
			grid-column: 4 / span 8;
			@include media('phone') {
				grid-column: 1 / -1;
			}
			div.text {
				font-size: var(--font-size-sm);
				color: var(--color-primary);
				margin-top: 5px;
			}
		}
	}
}

</style>