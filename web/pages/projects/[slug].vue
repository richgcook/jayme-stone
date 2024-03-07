<template>
	<div>
		<PageBuilderA :content="data.project.pageBuilder" v-if="data.project.pageBuilder?.length" />
		<NewsletterSignup :title="data.projectsPage.newsletterSelection?.active ? data.projectsPage.newsletterSelection.title : undefined" :segmentId="data.projectsPage.newsletterSelection?.segment" />
	</div>
</template>

<script setup>

const { $seoQuery, $richTextQuery, $imageQuery, $pageBuilderAQuery } = useNuxtApp()

const route = useRoute()

const query = groq`{ 

	"project": *[_type == "project" && slug.current == $slug] {
		_id, _type, slug, title, seo {
			${$seoQuery}
		},
		pageBuilder[] {
			${$pageBuilderAQuery}
		},
		newsletterSelection
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

<style lang="scss" scoped>

div.writing-layout {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: calc(var(--padding-base) * 4) var(--padding-base);
	padding: 0 var(--padding-base);
	@include media('phone') {
		grid-template-columns: 1fr;
		row-gap: calc(var(--padding-base) * 2);
	}
	div.back-container {
		grid-column: span 2;
		grid-row: 1;
		display: flex;
		@include media('phone') {
			grid-column: 1 / -1;
			grid-row: auto;
		}
		svg {
   			margin-top: 10px;
			height: 17px;
		}
	}
	div.titles {
		grid-column: 3 / span 8;
		grid-row: 1;
		display: grid;
		row-gap: calc(var(--padding-base) * 2);
		@include media('phone') {
			grid-column: 1 / -1;
			grid-row: auto;
			row-gap: var(--padding-base);
		}
		h1 {
			font-size: 66px;
			line-height: 1.05;
			@include media('phone') {
				font-size: 36px;
			}
		}
		div.additionals {
			line-height: 1.3;
			color: var(--color-primary);
		}
	}
	> div {
		grid-column: 1 / -1;
		padding: 0;
	}
}

</style>