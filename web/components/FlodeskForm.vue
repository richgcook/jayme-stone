<template>
	<div>
		<form class="newsletter" @submit.prevent="subscribeUser()">
			<input type="text" v-model="honeypot" name="usercode" tabindex="-1" autocomplete="off" />
			<input type="text" v-model="subscriber.first_name" placeholder="First name">
			<input type="email" v-model="subscriber.email" placeholder="Email address" required>
			<button type="submit" :disabled="loading || success">
				<TitleWithArrow 
					:arrowDirection="'next'" 
					:arrowPosition="'after'" 
					:lineLength="'100%'" 
					:color="`var(--color-black)`" 
					:rotation="`0.232`"
					:label="`Subscribe`"
				/>
			</button>
			<div class="message" v-show="success">{{ message }}</div>
			<div class="message --error" v-show="error">{{ message }}</div>
		</form>
	</div>
</template>

<script setup>

const props = defineProps({
	segmentId: {
		type: String,
		default: '65e7b5d61caf744c3a7479fd'
	}
})

const config = useRuntimeConfig()
const FLODESK_API_KEY = config.public.FLODESK_API_KEY

const subscribeEndpoint = `https://api.flodesk.com/v1/subscribers`

const subscriber = reactive({
	email: '',
	first_name: ''
})

const honeypot = ref('')

const loading = ref(false)
const success = ref(false)
const error = ref(false)
const message = ref('')

const subscribeUser = async () => {

	loading.value = true

	// Honeypot
	if (honeypot.value) {
		loading.value = false
		return
	}

	try {

    	const response = await fetch(subscribeEndpoint, {
      		method: 'POST',
      		headers: {
        		'Content-Type': 'application/json',
        		'Authorization': `Basic ${FLODESK_API_KEY}`,
     		},
      		body: JSON.stringify(subscriber),
    	})

   		if (!response.ok) {
      		throw new Error(`Failed to subscribe user: ${response.statusText}`)
    	}

    	const responseData = await response.json()
    	const subscriberId = responseData.id

		if (props.segmentId) { // Redundant check for now due to setting a default segment
			await addSubscriberToSegment(subscriberId)
		} else {
			loading.value = false
			success.value = true
			message.value = 'Thanks for subscribing. Keep an eye on your inbox!'
		}

  	} catch(error) {
    	console.error('Error subscribing user:', error)
		loading.value = false
		error.value = true
		message.value = 'There was an error subscribing you. Please try again later.'
  	}
}

const addSubscriberToSegment = async (subscriberId) => {
	try {
		
    	const segmentData = {
      		segment_ids: [props.segmentId],
    	}

    	const response = await fetch(`https://api.flodesk.com/v1/subscribers/${subscriberId}/segments`, {
      		method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Basic ${FLODESK_API_KEY}`,
			},
    		body: JSON.stringify(segmentData),
    	})

    	if (!response.ok) {
      		throw new Error(`Failed to add subscriber to segment: ${response.statusText}`)
    	}

    	loading.value = false
		success.value = true
		message.value = 'Thanks for subscribing. Keep an eye on your inbox!'

  	} catch (error) {
    	console.error('Error adding subscriber to segment:', error)
		loading.value = false
		error.value = true
		message.value = 'There was an error subscribing you. Please try again later.'
  	}
}

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
		&[name="usercode"] {
			opacity: 0;
			pointer-events: none;
			position: absolute;
			inset: 0;
			height: 0;
			width: 0;
			z-index: -1;
		}
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
		&:hover {
			background-color: var(--color-pink);
		}
		&[disabled] {
			cursor: not-allowed;
			opacity: 0.5;
		}
	}
	div.message {
		color: var(--color-beige);
		margin-top: 10px;
		&.--error {
			color: var(--color-red);
		}
	}
}

</style>