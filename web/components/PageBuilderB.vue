<template>
	<div class="blocks-layout">

		<div v-for="(block, index) in content" :key="index" class="block" ref="blocks" :data-type="useBlockType(block._type)">

			<div v-if="useBlockType(block._type) == 'text'">
				<RichText :blocks="block.text" />
			</div>

			<div v-else-if="useBlockType(block._type) == 'image'">
				<ImgWithRatio 
					:src="block.image.asset.url"
					:alt="block.image.alt"
					:ratio="block.image.asset.ratio"
				/>
				<RichText :blocks="block.caption" v-if="block.caption?.length" />
			</div>

			<div class="videos" v-else-if="useBlockType(block._type) == 'videos'">
				<h3 class="block-title">{{ block.videos?.length > 1 ? `Videos` : `Video` }}</h3>
				<div class="videos-layout">
					<div v-for="(video, index) in block.videos" :key="index" class="video">
						<div v-if="useBlockType(video._type) == 'embed'">
							<VideoEmbed 
								:poster="video.coverImage" 
								:html="video.embedCode" 
								:buttonColor="video.colors?.button?.hex" 
								:iconColor="video.colors?.icon?.hex"
							/>
							<h3>{{ video.title }}</h3>
						</div>
						<div v-else-if="useBlockType(video._type) == 'video-ref'">
							<VideoEmbed 
								:poster="video.video.coverImage" 
								:html="video.video.embedCode" 
								:buttonColor="video.video.colors?.button?.hex" 
								:iconColor="video.video.colors?.icon?.hex"
							/>
							<h3>{{ video.video.title }}</h3>
						</div>
					</div>
				</div>
			</div>

			<div v-else-if="useBlockType(block._type) == 'press'">
				<h3 class="block-title">Press</h3>
				<div class="press-layout">
					<div v-for="(press, index) in block.press" :key="index" class="item">
						<h3>{{ press.text }}</h3>
						<h5>{{ press.referrerName }}</h5>
					</div>
				</div>
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
	row-gap: 50px;
	> div.block {
		h3.block-title {
			font-family: var(--font-family-mono);
			font-size: var(--font-size-mono-caps);
			text-transform: uppercase;
			letter-spacing: 0.05em;
			&:after {
				content: '';
				display: block;
				height: 1px;
				width: 100%;
				background-color: var(--color-yellow);
				margin: 9px 0 15px 0;
			}
		}
		&[data-type="text"] {
			max-width: 850px;
			margin: 0 auto;
		}
		&[data-type="videos"] {
			div.videos {
				div.videos-layout {
					display: grid;
					row-gap: 1.6em;
					div.video {
						h3 {
							margin-top: 10px;
						}
					}
				}
			}
		}
		&[data-type="press"] {
			div.press-layout {
				display: grid;
				row-gap: 1.6em;
				div.item {
					h5 {
						font-family: var(--font-family-mono);
						font-size: var(--font-size-mono-sm);
						text-transform: uppercase;
						letter-spacing: 0.05em;
					}
				}
			}
		}
	}
}

</style>