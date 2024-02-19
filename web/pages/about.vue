<template>
	<div class="about-layout">
		<div class="title">
			<h2>{{ data.aboutPage.title }}</h2>
		</div>
		<PageBuilderA :content="data.aboutPage.pageBuilder" v-if="data.aboutPage.pageBuilder?.length" />
	</div>
</template>

<script setup>

const { $seoQuery, $richTextQuery, $imageQuery } = useNuxtApp()

const query = groq`{ 

	"aboutPage": *[_type == "aboutPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		pageBuilder[] {
			_type,
			_type == "textBlock" => {
				text[] {
					${$richTextQuery}
				},
			},
			_type == "imageBlock" => {
				image {
					${$imageQuery}
				},
				caption[] {
					${$richTextQuery}
				},
			},
		},
	}[0]
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.aboutPage)

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

div.about-layout {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: calc(var(--padding-base) * 4) var(--padding-base);
	padding: 0 var(--padding-base);
	@include media('phone') {
		grid-template-columns: 1fr;
		row-gap: calc(var(--padding-base) * 2);
	}
	> div.title {
		grid-column: 1 / span 5;
		grid-row: 1;
		@include media('phone') {
			grid-column: 1 / -1;
			grid-row: auto;
		}
		h2 {
			font-size: var(--font-size-md);
			line-height: 1;
			color: var(--color-primary);
		}
	}
	> div {
		grid-column: 1 / -1;
		grid-row: 1;
		padding: 0;
		@include media('phone') {
			grid-row: auto;
		}
	}
}

</style>