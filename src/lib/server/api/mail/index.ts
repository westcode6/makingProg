import { BREVO_API_KEY } from '$env/static/private';

const API_URL = 'https://api.brevo.com/v3/smtp/email';
const SENDER = 'gopluvaltd@gmail.com';

export const sendTransactionalMail = async (payload: {
	to: { name: string; email: string }[];
	subject: string;
	HTMLContent: string;
	sender?: { name: string; email: string };
}) => {
	const res = await fetch(API_URL, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'api-key': BREVO_API_KEY,
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			sender: {
				name: payload.sender?.name || 'Kokolity',
				email: payload.sender?.email || SENDER
			},
			to: payload.to,
			subject: payload.subject,
			htmlContent: MailTemplate(payload.HTMLContent)
		})
	});

	return await res.json();
};

const MailTemplate = (content: string): string => {
	return `<!DOCTYPE html>
	<html lang="en">
	  <head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Kokolity</title>
	  </head>
	  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif">
		<table
		  cellpadding="0"
		  cellspacing="0"
		  width="100%"
		  style="max-width: 600px; margin: 0 auto"
		>
		  <!-- Header -->
		  <tr>
			<td align="center" bgcolor="#f7f7f7" style="padding: 20px">
			  <img
				src="https://ik.imagekit.io/kokolity/assets/logo.png"
				alt="Kokolity"
				width="120"
			  />
			</td>
		  </tr>
	
		  <style>
			h2,
			p {
			  margin-bottom: 20px;
			  color: #333333;
			  line-height: 2;
			}
			p {
			  font-size: 18px;
			}
		  </style>
	
		  <!-- Content -->
		  <tr>
			<td align="left" style="padding: 20px; background-color: #fefefe">
			  ${content}
			</td>
		  </tr>
	
		  <!-- Footer -->
		  <tr>
			<td align="center" bgcolor="#f7f7f7" style="padding: 20px">
			  <p style="margin: 0; color: #999999">
				&copy; 2023 Kokolity. All rights reserved.
			  </p>
			</td>
		  </tr>
		</table>
	  </body>
	</html>
	`;
};
