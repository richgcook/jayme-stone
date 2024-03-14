<template>
	<div>
		<div class="videos-layout">
			<div v-for="(video, index) in data.videos" :key="video._id" class="video" :style="{ 'background-color': video.colors?.bg?.hex, 'color': video.colors?.text?.hex }">
				<div class="inner">
					<VideoEmbed 
						:poster="video.coverImage" 
						:html="video.embedCode" 
						:buttonColor="video.colors?.button?.hex" 
						:iconColor="video.colors?.icon?.hex"
						:isOverview="true"
						:title="video.title"
						:isFirst="index == 0"
						:pageTitle="data.videosPage.title"
					/>
				</div>
				<GraphicsImageVideo :index="Number(video.imageVideoGraphic?.graphic)" :fill="video.colors?.graphic?.hex" :position="video.imageVideoGraphic?.position" v-if="video.imageVideoGraphic?.active" />
				<span class="script" :style="{ 'color': video.colors?.text?.hex }" v-if="index == 0">{{ data.videosPage.title }}</span>
			</div>
		</div>
		<NewsletterSignup :title="data.videosPage.newsletterSelection?.active ? data.videosPage.newsletterSelection.title : undefined" :segmentId="data.videosPage.newsletterSelection?.segment" />
	</div>
</template>

<script setup>

const { $seoQuery, $imageQuery } = useNuxtApp()

const query = groq`{ 

	"videosPage": *[_type == "videosPage"] {
		_id, title, slug, seo {
			${$seoQuery}
		},
		newsletterSelection
	}[0],

	"videos": *[_type == "video"] | order(orderRank) {
		_id, title, slug, seo {
			${$seoQuery}
		},
		coverImage {
			${$imageQuery}
		},
		embedCode,
		title,
		colors,
		imageVideoGraphic,
	}
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.videosPage)

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

div.videos-layout {
	div.video {
		position: relative;
		height: 80vh;
		@supports (height: 100svh) {
			height: 80svh;
		}
		@include media('phone') {
			height: 50vh;
			@supports (height: 100svh) {
				height: 50svh;
			}
		}
		div.inner {
			height: 100%;
  			width: 100%;
			position: relative;
			z-index: 1;
		}
		span.script {
			font-family: var(--font-family-script);
			position: absolute;
			top: 0;
			right: 0;
			transform: translate(-100px, -50%);
			font-size: 60px;
			line-height: 1;
			text-transform: lowercase;
			pointer-events: none;
			@include media('tablet') {
				display: none;
			}
			@include media('phone') {
				display: none;
			}
		}
	}
}

</style>