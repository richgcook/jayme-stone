<template>
	<div>

		<NewsletterSignup />
	</div>
</template>

<script setup>

const { $seoQuery, $richTextQuery, $imageQuery } = useNuxtApp()

const query = groq`{ 

	"homePage": *[_type == "homePage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		featuredImage {
			${$imageQuery}
		},
		introduction[] {
			${$richTextQuery}
		},
	}[0]
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.homePage)

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

div.home-layout {
	display: grid;
	grid-template-columns: 1fr 1fr;
	height: 100vh;
	@supports (height: 100svh) {
		height: 100svh;
	}
	@include media('phone') {
		grid-template-columns: auto;
		grid-template-rows: 1fr 1fr;
	}
	div.left {
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-end;
		padding: var(--padding-base) var(--padding-base) calc(var(--font-size-sm) + (var(--padding-base) * 3)) var(--padding-base);
		font-size: var(--font-size-lg);
		line-height: 1.11;
		@include media('phone') {
			padding: var(--padding-base);
		}
	}
	div.right {
		position: relative;
		height: 100%;
		width: 100%;
		img {
			position: absolute;
			inset: 0;
			height: 100%;
			width: 100%;
			object-fit: cover;
		}
	}
}

</style>