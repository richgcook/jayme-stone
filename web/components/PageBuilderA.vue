<template>
	<div class="blocks-layout">

		<div v-for="(block, index) in content" :key="index" class="block" ref="blocks" :data-type="useBlockType(block._type)">

			<div v-if="useBlockType(block._type) == 'image-text'" :class="{ '--flip': block.orientation == 'even' }">
				<div class="image">
					<Img
						:src="block.image.asset.url"
						:alt="block.image.alt"
					/>
					<GraphicsImageVideo :index="Number(block.imageVideoGraphic?.graphic)" :fill="block.colors?.graphic?.hex" :position="block.imageVideoGraphic?.position" v-if="block.imageVideoGraphic?.active" />
				</div>
				<div class="text">
					<TitleWithArrow 
						:arrowDirection="'next'" 
						:arrowPosition="'after'" 
						:lineLength="'50%'" 
						:color="`var(--color-green)`" 
						:label="block.title"
						v-if="block.title"
					/>
					<RichText :blocks="block.text" />
				</div>
			</div>

			<div v-else-if="useBlockType(block._type) == 'content-column'">
				<div class="content-column">
					<div>
						<GraphicsRectangleY :bgColor="block.colors?.bg?.hex" :fill="block.colors?.graphic?.hex" :index="1" />
					</div>
					<div class="content">
						<PageBuilderB :content="block.content" v-if="block.content?.length" />
					</div>
					<div>
						<GraphicsRectangleY :bgColor="block.colors?.bg?.hex" :fill="block.colors?.graphic?.hex" :index="2" />
					</div>
				</div>
			</div>

			<div v-else-if="useBlockType(block._type) == 'press-kit'">
				<div class="kit-sections">
					<template v-for="(block, index) in block.content">
						<PressKitPhotos :downloads="block.photos" :key="index" v-if="useBlockType(block._type) == 'photos'" />
						<PressKitResources :downloads="block.resources" :key="index" v-if="useBlockType(block._type) == 'resources'" />
						<PressKitContact :links="block.contact" :sectionTitle="`Links`" :key="index" v-if="useBlockType(block._type) == 'contact'" />
					</template>
				</div>
			</div>

			<div v-else-if="useBlockType(block._type) == 'events'">
				<template v-for="(block, index) in block.content">
					<EventsUpcoming :events="block.upcomingEvents" :key="index" v-if="useBlockType(block._type) == 'events-upcoming'" />
					<EventsArchive :eventsByCategory="block.eventsArchive" :key="index" v-if="useBlockType(block._type) == 'events-archive'" />
				</template>
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
	grid-template-columns: repeat(4, 1fr);
	@include media('tablet-portrait-and-phone') {
		grid-template-columns: 1fr 1fr;
	}
	> div.block {
		&[data-type="image-text"] {
			grid-column: 1 / -1;
			> div {
				display: grid;
				grid-template-columns: 1fr 1fr;
				@include media('tablet-portrait-and-phone') {
					grid-template-columns: 1fr;
				}
				&.--flip {
					> div.image {
						grid-column: 2;
						grid-row: 1;
						@include media('tablet-portrait-and-phone') {
							grid-column: 1;
							grid-row: 1;
						}
					}
					> div.text {
						grid-column: 1;
						grid-row: 1;
						@include media('tablet-portrait-and-phone') {
							grid-row: 2;
						}
					}
				}
				> div.image {
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
				> div.text {
					display: flex;
					flex-flow: column nowrap;
					justify-content: center;
					row-gap: 20px;
					font-size: var(--font-size-md);
					line-height: 1.5;
					padding: 50px 100px;
					@include media('tablet-landscape') {
						padding: 60px;
					}
					@include media('tablet-portrait-and-phone') {
						padding: 60px 30px;
					}
				}
			}
		}
		&[data-type="content-column"] {
			grid-column: 1 / -1;
			div.content-column {
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				background-color: var(--color-beige);
				@include media('tablet-portrait-and-phone') {
					grid-template-columns: 1fr 1fr;
				}
				> div.content {
					grid-column: 2 / span 2;
					background-color: var(--color-beige);
					padding: 90px;
					@include media('tablet-landscape') {
						padding: 60px;
					}
					@include media('tablet-portrait-and-phone') {
						grid-column: 1 / -1;
						padding: 60px 30px;
					}
					div.blocks-layout {
						grid-template-columns: 1fr;
					}
				}
			}
		}
		&[data-type="press-kit"] {
			grid-column: 1 / -1;
			background-color: var(--color-beige);
			div.kit-sections {
				display: grid;
				row-gap: 75px;
				padding: 100px 7%;
				position: relative;
				@include media('tablet-portrait-and-phone') {
					row-gap: 60px;
					padding: 0 30px 60px 30px;
				}
				:deep(h2.section-title) {
					color: var(--color-green);
					&:after {
						content: '';
						display: block;
						height: 1px;
						width: 100%;
						background-color: white;
						margin: 25px 0 35px 0;
					}
				}
			}
		}
		&[data-type="events"] {
			grid-column: 1 / -1;
			background-color: var(--color-beige);
		}
	}
}

</style>