<template>
	<div>
		<div class="form-layout">
			<div>
				<GraphicsRectangleY :index="5" :isFullColor="true" />
			</div>
			<div class="content">
				<TitleWithArrow 
					:arrowDirection="'next'" 
					:arrowPosition="'after'" 
					:lineLength="'50%'" 
					:color="`var(--color-green)`" 
					:label="data?.form.subtitle"
				/>
				<RichText :blocks="data?.form.introduction" />
				<form 
					:name="route.params.slug" 
					method="POST" 
					@submit.prevent="submitForm"
					ref="form"
					v-show="!formSucess"
				>
					<input type="hidden" name="form-name" :value="route.params.slug" />

					<template v-for="(field, index) in data?.form.formFields">

						<input type="text" :name="sanitizeFieldLabel(field.label)" :placeholder="field.label" :required="field.required" :key="index" v-if="field._type === 'textInput'" />

						<input type="email" :name="sanitizeFieldLabel(field.label)" :placeholder="field.label" :required="field.required" :key="index" v-if="field._type === 'emailInput'" />

						<div v-if="field._type === 'textarea'" :key="index">
							<textarea :name="sanitizeFieldLabel(field.label)" :placeholder="field.label" :required="field.required" rows="5" ></textarea>
						</div>

						<div v-if="field._type === 'select'" :key="index">
							<select :name="sanitizeFieldLabel(field.label)" :required="field.required">
								<option value="" disabled selected>{{ field.label }}</option>
								<option v-for="option in field.options" :key="option._key" :value="option">{{ option }}</option>
							</select>
						</div>

					</template>

					<button type="submit">
						<span class="label">{{ data?.form.submitLabel }}</span>
						<span class="line-arrow">
							<span class="line"></span>
							<SymbolArrowHeadNext :fill="`var(--color-beige)`" />
						</span>
					</button>
				</form>
				<div class="message" v-show="formSucess">{{ formMessage }}</div>
				<div class="message --error" v-show="formError">{{ formMessage }}</div>
			</div>
			<div>
				<GraphicsRectangleY :index="5" :isFullColor="true" />
			</div>
		</div>
		<NewsletterSignup />
	</div>
</template>

<script setup>

const { $seoQuery, $richTextQuery } = useNuxtApp()

const route = useRoute()

const query = groq`{ 

	"form": *[_type == "form" && slug.current == $slug] {
		_id, _type, slug, title, seo {
			${$seoQuery}
		},
		subtitle,
		introduction[] {
			${$richTextQuery}
		},
		formFields,
		submitLabel, successMessage
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
	const formData = new FormData(form.value)

	let emailContent = ''

	formData.forEach((value, key) => {
		if (value.trim() !== '') emailContent += `<p><strong>${key}:</strong> ${value}</p>`
	});

	fetch('/.netlify/functions/send-contact-form', {
		method: 'POST',
		body: emailContent
	})
	.then(response => {
		if (!response.ok) {
			throw new Error('Failed to submit form, please try again later')
		}
		return response.json()
	})
	.then(() => {
		formSucess.value = true
		formMessage.value = data?.value.form.successMessage
	})
	.catch((error) => {
		formError.value = true
		formMessage.value = error
		console.error(error)
	})

}

const sanitizeFieldLabel = (label) => {
	return label.toLowerCase().replace(/[^\w\s]|_/g, '').replace(/\s+/g, '-')
}

</script>

<style lang="scss" scoped>

div.form-layout {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	background-color: var(--color-beige);
	> div.content {
		grid-column: 2 / span 2;
		padding: 90px;
		display: grid;
		row-gap: 1.6em;
		div.message {
			&.--error {
				color: var(--color-red);
			}
		}
	}
	form {
		display: grid;
		row-gap: 10px;
		input[type="text"],
		input[type="email"] {
			all: unset;
			box-sizing: border-box;
			height: 85px;
			width: 100%;
			padding: 0 25px;
			color: var(--color-black);
			@include placeholder {
				color: currentColor;
			}
			font-family: var(--font-family-mono);
			font-size: var(--font-size-mono-md);
			border: 1px solid currentColor;
		}
		textarea {
			all: unset;
			box-sizing: border-box;
			width: 100%;
			padding: 25px;
			color: var(--color-black);
			@include placeholder {
				color: currentColor;
			}
			font-family: var(--font-family-mono);
			font-size: var(--font-size-mono-md);
			border: 1px solid currentColor;
		}
		select {
			all: unset;
			box-sizing: border-box;
			width: 100%;
			padding: 30px 100px 30px 25px;
			color: var(--color-black);
			@include placeholder {
				color: currentColor;
			}
			font-family: var(--font-family-mono);
			font-size: var(--font-size-mono-md);
			border: 1px solid currentColor;
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='15' viewBox='0 0 28 15' fill='none'%3E%3Cpath d='M27 0.999979L14 14L1.00002 0.999979' stroke='%23141313'/%3E%3C/svg%3E");			background-repeat: no-repeat;
			background-position: calc(100% - 25px) 50%;
			background-size: 18px;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		button[type="submit"] {
			all: unset;
			cursor: pointer;
			box-sizing: border-box;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			column-gap: 2ch;
			height: 85px;
			width: 100%;
			padding: 0 25px;
			font-family: var(--font-family-mono);
			font-size: var(--font-size-mono-caps);
			letter-spacing: 0.05em;
			text-transform: uppercase;
			background-color: var(--color-green);
			color: var(--color-beige);
			text-decoration: none;
			span.line-arrow {
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				width: 100%;
				span.line {
					display: block;
					height: 1px;
					width: 100%;
					background-color: var(--color-beige)
				}
				svg {
					width: 4px;
					margin-left: -3px;
				}
			}
			span.label {
				flex-shrink: 0;
			}
		}
	}
}

</style>