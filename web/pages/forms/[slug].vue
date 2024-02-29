<template>
	<div>
		<form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" method="POST">

			<input name="first-name" placeholder="First Name">
			<input name="last-name" placeholder="Last Name">
			<input type="submit" value="Submit">

			</form>
	</div>
</template>

<script setup>

const { $seoQuery, $richTextQuery, $imageQuery, $pageBuilderAQuery } = useNuxtApp()

const route = useRoute()

const query = groq`{ 

	"form": *[_type == "form" && slug.current == $slug] {
		_id, _type, slug, title, seo {
			${$seoQuery}
		}
	}[0],
	
}`

const { data } = await useSanityQuery(query, { 
    slug: route.params.slug,
})

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.form)

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