<template>
	<div>
		<PageBuilderA :content="data.project.pageBuilder" v-if="data.project.pageBuilder?.length" />
		<NewsletterSignup :title="data.projectsPage.newsletterSelection?.active ? data.projectsPage.newsletterSelection.title : undefined" :segmentId="data.projectsPage.newsletterSelection?.segment" />
	</div>
</template>

<script setup>

const { $seoQuery, $pageBuilderAQuery } = useNuxtApp()

const route = useRoute()

const query = groq`{ 

	"project": *[_type == "project" && slug.current == $slug] {
		_id, _type, slug, title, seo {
			${$seoQuery}
		},
		pageBuilder[] {
			${$pageBuilderAQuery}
		},
	}[0],

	"projectsPage": *[_type == "projectsPage"] {
		newsletterSelection
	}[0],
	
}`

const { data } = await useSanityQuery(query, { 
    slug: route.params.slug,
})

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.project)

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