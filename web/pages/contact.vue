<template>
	<div class="contact-layout">
		<div class="left" v-if="data.contactPage.contact?.length">
			<h2>{{ data.contactPage.title }}</h2>
			<RichText :blocks="data.contactPage.contact" />
		</div>
		<div class="right" v-if="data.contactPage.featuredImage">
			<Img 
				:src="data.contactPage.featuredImage.asset.url"
				:alt="data.contactPage.featuredImage.asset.alt"
			/>
		</div>
	</div>
</template>

<script setup>

const { $seoQuery, $richTextQuery, $imageQuery } = useNuxtApp()

const query = groq`{ 

	"contactPage": *[_type == "contactPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		featuredImage {
			${$imageQuery}
		},
		contact[] {
			${$richTextQuery}
		},
	}[0]
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.contactPage)

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

const config = useRuntimeConfig()

const contentOpen = ref(false)

</script>

<style lang="scss" scoped>

div.contact-layout {
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
		display: grid;
		grid-template-rows: auto 1fr;
		row-gap: calc(var(--padding-base) * 2);
		padding: calc(64px + var(--padding-base) * 5) var(--padding-base) calc(var(--font-size-sm) + (var(--padding-base) * 3)) var(--padding-base);
		font-size: var(--font-size-lg);
		line-height: 1.11;
		@include media('phone') {
			padding: calc(59px + var(--padding-base) * 5) var(--padding-base) var(--padding-base) var(--padding-base);
		}
		> h2 {
			font-size: var(--font-size-md);
			line-height: 1;
			color: var(--color-primary);
		}
		> div.text {
			align-self: flex-end;
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