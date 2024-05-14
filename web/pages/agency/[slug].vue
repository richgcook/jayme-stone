<template>
	<div>
		<PageBuilderA :content="data.agencyClient?.pageBuilder" v-if="data.agencyClient?.pageBuilder?.length" />
	</div>
</template>

<script setup>

const { $seoQuery, $pageBuilderAQuery } = useNuxtApp()

const route = useRoute()

const query = groq`{ 

	"agencyClient": *[_type == "agencyClient" && slug.current == $slug] {
		_id, _type, slug, title, seo {
			${$seoQuery}
		},
		pageBuilder[] {
			${$pageBuilderAQuery}
		},
	}[0],

	"agencyPage": *[_type == "agencyPage"] {
		newsletterSelection
	}[0],
	
}`

const { data } = await useSanityQuery(query, { 
    slug: route.params.slug,
})

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.agencyClient)

useHead({
	title: title.value,
	meta: useSeoFields({
		title: title.value,
		description: description.value,
		image: image.value
	}),
	bodyAttrs: {
		class: bodyClass.value
	}
})

</script>