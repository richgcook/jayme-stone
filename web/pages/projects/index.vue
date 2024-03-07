<template>
	<div class="projects-overview">
		<PageHeader :title="data.projectsPage.title" />
		<ProjectsCategory :title="`As Artist`" :projects="data.projects" :isFirst="true" />
		<ProjectsCategory 
			:title="`As Integrator`" 
			:projects="data.projectsAsIntegrator" 
			:bgColor="`var(--color-blue)`"
			:categoryTitleColor="`var(--color-pink)`"
			:titleColor="`var(--color-pink)`"
			:subtitleColor="`var(--color-beige)`"
			:linkColor="`var(--color-beige)`"
			:lineColor="`var(--color-green)`"
		/>
		<NewsletterSignup :title="data.projectsPage.newsletterSelection?.active ? data.projectsPage.newsletterSelection.title : undefined" :segmentId="data.projectsPage.newsletterSelection.segment ?? ''" />
	</div>
</template>

<script setup>

const { $seoQuery, $imageQuery } = useNuxtApp()

const query = groq`{ 

	"projects": *[_type == "project"] | order(orderRank) {
		_id, _type, slug, title, seo {
			${$seoQuery}
		},
		featuredImage {
			${$imageQuery}
		},
		subtitle, externalLink
	},

	"projectsAsIntegrator": *[_type == "projectIntegrator"] | order(orderRank) {
		_id, _type, slug, title, seo {
			${$seoQuery}
		},
		featuredImage {
			${$imageQuery}
		},
		subtitle, externalLink
	},

	"projectsPage": *[_type == "projectsPage"] {
		_id, title, slug, seo {
			${$seoQuery}
		},
		newsletterSelection
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.projectsPage)

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

div.projects-overview {
	background-color: var(--color-beige);
}

</style>