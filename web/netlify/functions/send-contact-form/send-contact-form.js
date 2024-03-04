//import { Resend } from 'resend'

//const resend = new Resend(process.env.RESEND_API_KEY)

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
		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${RESEND_API_KEY}`,
			},
			body: JSON.stringify({
				from: 'Acme <onboarding@resend.dev>',
				to: ['rich.g.cook@gmail.com'],
				subject: 'hello world',
				html: '<strong>it works!</strong>',
			}),
		});

		if (res.ok) {
			const data = await res.json();
	  
			return {
			  statusCode: 200,
			  body: data,
			};
		  } else {
			throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
		  }
		} catch (error) {
		  return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		  };
		}
		
	/*

	// Parse the incoming JSON body
	const requestData = JSON.parse(body)
	console.log('requestData', requestData)

	*/

	/*

	try {

		

		// Return a 200 OK response after handling the request
		return {
			statusCode: 200,
			body: JSON.stringify({ message: "OK" }),
		};

	  } catch (error) {
		// Log any errors and return a 500 Internal Server Error response
		console.error("Error:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Internal Server Error" }),
		};
	}

	*/

}