<template>
	<div>
		<form 
			:name="route.params.slug" 
			method="POST" 
			data-netlify="true" 
			data-netlify-honeypot="bot-field"
			@submit.prevent="submitForm"
			ref="form"
			v-show="!formSucess || !formError"
		>

			<input name="first-name" placeholder="First Name">
			<input name="last-name" placeholder="Last Name">
			<button type="submit">Submit</button>

			</form>
		<div v-show="formSucess || formError">{{ formMessage }}</div>
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

const form = ref(null)

const formSucess = ref(false)
const formError = ref(false)
const formMessage = ref('')

const submitForm = () => {
	console.log('submit form')
	const formData = new FormData(form.value)

	fetch('/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams(formData).toString()
	})
	.then(() => {
		formSucess.value = true
		formMessage.value = 'Form submitted successfully'
	})
	.catch((error) => {
		formError.value = true
		formMessage.value = error
	})
}

</script>

<style lang="scss" scoped>



</style>