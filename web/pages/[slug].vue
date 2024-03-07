<template>
	<div>
		<PageBuilderA :content="data.page.pageBuilder" v-if="data.page.pageBuilder?.length" />
		<ProducerTracks :tracks="data.page.selectedTracks" v-if="data.page.selectedTracks?.length" />
		<TestimonialsA :content="data.page.testimonialsA" v-if="data.page.testimonialsA?.length" />
		<TestimonialsB :content="data.page.testimonialsB" v-if="data.page.testimonialsB?.length" />
		<NewsletterSignup :title="data.page.newsletterSelection?.active ? data.page.newsletterSelection.title : undefined" :segmentId="data.page.newsletterSelection?.segment ?? ''" />
	</div>
</template>

<script setup>

const { $seoQuery, $imageQuery, $testimonialsAQuery, $pageBuilderAQuery } = useNuxtApp()

const route = useRoute()

const query = groq`{ 

	"page": *[_type == "pageA" && slug.current == $slug] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		pageBuilder[] {
			${$pageBuilderAQuery}
		},
		selectedTracks[] {
			image {
				${$imageQuery}
			},
			"file": file.asset->{
				_id, url, mimeType, extension
			},
			title, artists, role
		},
		testimonialsA[] {
			${$testimonialsAQuery}
		},
		testimonialsB[] {
			title, colors,
			testimonials[] {
				text, referrerName
			}
		},
		newsletterSelection
	}[0]
	
}`

const { data } = await useSanityQuery(query, { 
    slug: route.params.slug,
})

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.page)

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