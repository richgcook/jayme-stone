<template>
	<div>
		<PageBuilderA :content="data.page.pageBuilder" v-if="data.page.pageBuilder?.length" />
		<NewsletterSignup :title="data.page.newsletterSelection?.active ? data.page.newsletterSelection.title : undefined" />
	</div>
</template>

<script setup>

const { $seoQuery, $richTextQuery, $imageQuery, $pageBuilderAQuery } = useNuxtApp()

const route = useRoute()

const query = groq`{ 

	"page": *[_type == "pageA" && slug.current == $slug] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		pageBuilder[] {
			${$pageBuilderAQuery}
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

<style lang="scss" scoped>



</style>