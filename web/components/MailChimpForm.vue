<template>
	<div>
		<form class="newsletter" @submit.prevent="subscribe()">
			<input type="text" v-model="name" placeholder="Name" :disabled="success">
			<input type="email" v-model="email" placeholder="Email address" required :disabled="success">
			<button type="submit" v-if="!success" :disabled="loading">
				<TitleWithArrow 
					:arrowDirection="'next'" 
					:arrowPosition="'after'" 
					:lineLength="'100%'" 
					:color="`var(--color-black)`" 
					:rotation="`0.232`"
					:label="`Subscribe`"
				/>
			</button>
		</form>
		<div class="terms" v-if="!success && !error">
			<RichText :blocks="data.settingsGeneral.newsletterTerms" />
		</div>
		<div class="terms" v-if="success && !error">
			<p>{{ successMessage }}</p>
		</div>
		<div class="terms" v-if="error">
			<p>{{ error }}</p>
		</div>
	</div>
</template>

<script setup>

import jsonp from 'jsonp'

const props = defineProps({
	username: {
		type: String,
		required: true
	},
	server: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	listId: {
		type: String,
		required: true
	},
	successMessage: {
		type: String,
		default: 'Thank you for subscribing!'
	},
})

const name = ref('')
const email = ref('')
const success = ref(false)
const error = ref(null)
const loading = ref(false)

const url = computed(() => {
	return `https://${props.username}.${props.server}.list-manage.com/subscribe/post-json`
})

const params = computed(() => {
	let params = {
		u: props.userId,
		id: props.listId,
		NAME: name.value,
		EMAIL: email.value
	}
	return Object.keys(params).map(key => key + '=' + params[key]).join('&')
})

const subscribe = () => {
	if (loading.value) return
	loading.value = true
	const jsonpUrl = `${url.value}?${params.value}`
	jsonp(jsonpUrl, { param: 'c' }, onResponse)
}

const onResponse = (error, data) => {
	console.log({ error, data })
	loading.value = false
	if (error) error.value = error
	if (data && data.result === 'error') error.value = formatErrorMessage(data.msg)
	if (!error) {
		success.value = true
		email.value = ''
	}
}

const formatErrorMessage = (message) => {
	return message.replace('0 - ', '')
}

const { $richTextQuery } = useNuxtApp()

const query = groq`{ 

	"settingsGeneral": *[_type == "settingsGeneral"] {
		newsletterTerms[] {
			${$richTextQuery}
		},
	}[0],
	
}`

const { data } = await useSanityQuery(query)

</script>


<style lang="scss" scoped>

form.newsletter {
	display: grid;
	row-gap: 10px;
	input[type="text"],
	input[type="email"] {
		all: unset;
		height: 85px;
		padding: 0 25px;
		color: var(--color-beige);
		@include media('phone') {
			height: 50px;
			padding: 0 15px;
		}
		@include placeholder {
			color: currentColor;
			font-size: var(--font-size-mono-caps);
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}
		font-family: var(--font-family-mono);
		font-size: var(--font-size-mono-md);
		background-color: var(--color-blue);
		padding: 0 25px;
	}
	button[type="submit"] {
		all: unset;
		cursor: pointer;
		box-sizing: border-box;
		height: 85px;
		padding: 0 25px;
		font-family: var(--font-family-mono);
		font-size: var(--font-size-mono-caps);
		letter-spacing: 0.05em;
		text-transform: uppercase;
		background-color: var(--color-yellow);
		@include media('phone') {
			height: 50px;
			padding: 0 15px;
		}
		&[disabled] {
			opacity: 0.5;
		}
	}
}
div.terms {
	font-size: var(--font-size-xs);
	text-align: center;
	margin-top: 30px;
	max-width: 470px;
	@include media('phone') {
		margin-top: 15px;
	}
}

</style>