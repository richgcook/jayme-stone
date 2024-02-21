<template>
	<div class="music-layout">
		<div v-for="music in data.music" :key="music._id" class="music">
			<div class="image">
				<Img
					:src="music.featuredImage.asset.url"
					:alt="music.featuredImage.asset.alt"
				/>
			</div>
			<div class="text">
				<h2>{{ music.title }}</h2>
				<ul class="streaming-links" v-if="music.streamingLinks?.length">
					<li v-for="(link, index) in music.streamingLinks" :key="index">
						<NuxtLink :to="link.link" target="_blank">{{ link.title }}</NuxtLink>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>

const { $seoQuery, $imageQuery } = useNuxtApp()

const query = groq`{ 

	"musicPage": *[_type == "musicPage"] {
		_id, title, slug, seo {
			${$seoQuery}
		},
	}[0],

	"music": *[_type == "music"] {
		_id, title, slug, seo {
			${$seoQuery}
		},
		featuredImage {
			${$imageQuery}
		},
		bgColor, textColor, streamingLinks,
	}
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.musicPage)

useHead({
	title: title.value,
	meta: useCreateSeoMeta({
		title: title.value,
		description: description.value,
		image: image.value
	}),
	bodyAttrs: {
		class: bodyClass.value
	}
})

</script>

<style lang="scss" scoped>

div.music-layout {
	div.music {
		display: grid;
		grid-template-columns: 1fr 1fr;
		&:nth-child(even) {
			> div.image {
				grid-column: 2;
				grid-row: 1;
			}
			> div.text {
				grid-column: 1;
				grid-row: 1;
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
			row-gap: 10px;
			padding: 0 100px;
			h2 {
				font-size: var(--font-size-lg);
				line-height: 1;
			}
			ul.streaming-links {
				display: flex;
				flex-flow: row wrap;
				li {
					font-family: var(--font-family-mono);
					font-size: var(--font-size-mono-sm);
					&:not(:last-child) {
						&:after {
							content: ',';
							margin-right: 1ch;
						}
					}
				}
			}
		}
	}
}

</style>