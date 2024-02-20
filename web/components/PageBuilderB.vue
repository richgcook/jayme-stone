<template>
	<div class="blocks-layout">

		<div v-for="(block, index) in content" :key="index" class="block" ref="blocks" :data-type="useBlockType(block._type)">

			<div v-if="useBlockType(block._type) == 'text'">
				<RichText :blocks="block.text" />
			</div>

			<div v-else-if="useBlockType(block._type) == 'image'" :data-image-orientation="block.image.asset.orientation">
				<div class="image-container">
					<ImgWithRatio 
						:src="block.image.asset.url"
						:alt="block.image.asset.alt"
						:ratio="block.image.asset.ratio"
					/>
				</div>
				<RichText :blocks="block.caption" />
			</div>

			<div v-else-if="useBlockType(block._type) == 'audio'">
				<AudioPlayer :src="block.audio" />
				<RichText :blocks="block.caption" v-if="block.caption?.length" />
			</div>

			<div v-else-if="useBlockType(block._type) == 'embed'">
				<VideoEmbed :poster="block.coverImage" :html="block.embedCode" />
				<RichText :blocks="block.caption" v-if="block.caption?.length" />
			</div>

			<div v-else-if="useBlockType(block._type) == 'video'">
				<VideoPlayer :src="block.video" />
				<RichText :blocks="block.caption" v-if="block.caption?.length" />
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
	
}

</style>