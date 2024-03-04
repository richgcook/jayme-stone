const RESEND_API_KEY = process.env.RESEND_API_KEY
const toEmailAddresses = ['rich.g.cook@gmail.com']

const formatKey = (key) => {
	const words = key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1))
	return words.join(' ')
}

export async function handler(event) {

	const { body, httpMethod: method } = event

	// Ignore non-POST requests
	if (method !== "POST") {
		return {
			statusCode: 405,
			body: JSON.stringify({ error: "Method not allowed" })
		}
	}

	try {

		const requestBody = JSON.parse(body)

		const { 
			'form-title': formTitle,
			email
		} = requestBody

		const keys = Object.keys(requestBody)
		const excludedFields = ['form-name', 'form-title', 'usercode']

		console.log('requestBody:', requestBody)

		let emailHtml = ''

		keys.forEach((key, index) => {
			if (excludedFields.includes(key)) return
			const value = requestBody[key]
			if (value.trim() === '') return
			const formattedKey = formatKey(key)
			emailHtml += `<strong>${formattedKey}:</strong> ${value}`
			if (index !== keys.length - 1) emailHtml += '<br>'
		})

		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${RESEND_API_KEY}`,
			},
			body: JSON.stringify({
				from: 'Acme <onboarding@resend.dev>',
				reply_to: email ? email : '',
				to: toEmailAddresses,
				subject: `New submission from website form: ${formTitle}`,
				html: emailHtml
			}),
		})

		if (res.ok) {
			return {
				statusCode: 200,
				body: JSON.stringify({ message: "OK" }),
			}
		} else {
			throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
		}

	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		}
	}

}