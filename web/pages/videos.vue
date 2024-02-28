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
			</div>
		</div>
		<NewsletterSignup :title="data.videosPage.newsletterSelection?.active ? data.videosPage.newsletterSelection.title : undefined" />
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
		height: 70vh;
		@supports (height: 100svh) {
			height: 70svh;
		}
		div.inner {
			height: 100%;
  			width: 100%;
		}
	}
}

</style>