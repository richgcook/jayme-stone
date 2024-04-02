<template>
	<div class="press-overview">
		<PageHeader :title="data.pressPage.title" />
		<div class="kit-sections">
			<PressKitPhotos :downloads="data.pressPage.photos" v-if="data.pressPage.photos?.length" />
			<PressKitResources :downloads="data.pressPage.resources" v-if="data.pressPage.resources?.length" />
			<PressKitContact :links="data.pressPage.contact" v-if="data.pressPage.contact?.length" />
			<span class="script">{{ data.pressPage.title }}</span>
		</div>
		<NewsletterSignup :title="data.pressPage.newsletterSelection?.active ? data.pressPage.newsletterSelection.title : undefined" :segmentId="data.pressPage.newsletterSelection?.segment" />
	</div>
</template>

<script setup>

const { $seoQuery, $imageQuery } = useNuxtApp()

const query = groq`{ 

	"pressPage": *[_type == "pressPage"] {
		_id, title, slug, seo {
			${$seoQuery}
		},
		photos[] {
			image {
				${$imageQuery}
			},
			title, credits,
			"file": file.asset->url
		},
		resources[] {
			title,
			"file": file.asset->url
		},
		contact[] {
			title, link
		},
		newsletterSelection
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.pressPage)

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

div.press-overview {
	background-color: var(--color-beige);
	div.kit-sections {
		display: grid;
		row-gap: 75px;
		padding: 0 7% 100px 7%;
		position: relative;
		@include media('tablet-portrait-and-phone') {
			row-gap: 60px;
			padding: 0 30px 60px 30px;
		}
		:deep(h2.section-title) {
			color: var(--color-green);
			&:after {
				content: '';
				display: block;
				height: 1px;
				width: 100%;
				background-color: white;
				margin: 25px 0 35px 0;
			}
		}
		span.script {
			font-family: var(--font-family-script);
			color: var(--color-pink);
			position: absolute;
			bottom: 0;
			right: 0;
			transform: translate(50%, -200%) rotate(-90deg);
			font-size: 60px;
			line-height: 1;
			text-transform: lowercase;
			pointer-events: none;
			@include media('tablet-portrait-and-phone') {
				display: none;
			}
		}
	}
}

</style>