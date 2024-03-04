const RESEND_API_KEY = process.env.RESEND_API_KEY

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

		const formDataArray = body.split('&')

		let emailReplyTo = ''
		let emailSubject = 'New website form submission'
		let emailHtml = ''

		const emailPair = formDataArray.find(pair => {
			const [key] = pair.split('=')
			return key === 'email'
		})

		if (emailPair) emailReplyTo = decodeURIComponent(emailPair.split('=')[1].replace(/\+/g, ' '))

		const titlePair = formDataArray.find(pair => {
			const [key] = pair.split('=')
			return key === 'form-title'
		})
		  
		if (titlePair) {
			formTitle = decodeURIComponent(titlePair.split('=')[1].replace(/\+/g, ' '))
			emailSubject = `New submission from form: ${formTitle}`
		}

		const excludedFields = ['form-name', 'form-title']

		const formatKey = (key) => {
			return key.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
		}

		formDataArray.forEach(pair => {
			const [key, value] = pair.split('=')
			const decodedKey = formatKey(decodeURIComponent(key.replace(/\+/g, ' ')))
			const decodedValue = decodeURIComponent(value.replace(/\+/g, ' '))

			if (!excludedFields.includes(key) && decodedValue.trim() !== '') {
				emailHtml += `<p><strong>${decodedKey}:</strong> ${decodedValue}</p>`
			}
		})

		console.log('emailReplyTo:', emailReplyTo)
		console.log('emailSubject:', emailSubject)
		console.log('emailHtml:', emailHtml)

		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${RESEND_API_KEY}`,
			},
			body: JSON.stringify({
				from: 'Acme <onboarding@resend.dev>',
				reply_to: emailReplyTo,
				to: ['rich.g.cook@gmail.com'],
				subject: emailSubject,
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