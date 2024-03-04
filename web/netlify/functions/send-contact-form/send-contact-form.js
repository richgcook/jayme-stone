//import { Resend } from 'resend'

//const resend = new Resend(process.env.RESEND_API_KEY)

export async function handler(event) {

	const { body, httpMethod: method } = event

	// Ignore non-POST requests
	if (method !== "POST") {
		return {
			statusCode: 405,
			body: JSON.stringify({ error: "Method not allowed" })
		}
	}

	console.log('body', body)
	console.log('body', JSON.parse(body))

	return {
		statusCode: 200,
		body: JSON.stringify({ message: "OK" }),
	};

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