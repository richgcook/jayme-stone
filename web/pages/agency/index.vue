<template>
	<div class="agency-overview">
		<PageHeader :title="data.agencyPage.title" />
		<ProjectsCategory :projects="data.agencyClients" :isFirst="true" :isAgency="true" />
	</div>
</template>

<script setup>

const { $seoQuery, $imageQuery } = useNuxtApp()

const query = groq`{ 

	"agencyClients": *[_type == "agencyClient"] | order(orderRank) {
		_id, _type, slug, title, seo {
			${$seoQuery}
		},
		featuredImage {
			${$imageQuery}
		},
		subtitle
	},

	"agencyPage": *[_type == "agencyPage"] {
		_id, title, slug, seo {
			${$seoQuery}
		},
		newsletterSelection
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.agencyPage)

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

<style lang="scss" scoped>

div.agency-overview {
	background-color: var(--color-beige);
}

</style>