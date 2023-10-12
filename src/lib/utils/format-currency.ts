export const formatCurrency = (amount = 0, countryCode = '') => {
	let locale, currency;

	switch (countryCode.toLowerCase()) {
		case 'us':
			locale = 'en-US';
			currency = 'USD';
			break;

		case 'usd':
			locale = 'en-US';
			currency = 'USD';
			break;

		case 'ngn':
			locale = 'en-NG';
			currency = 'NGN';
			break;

		// add more currencies...

		default:
			locale = 'en-NG';
			currency = 'NGN';
	}

	const f = new Intl.NumberFormat(locale, {
		currency,
		style: 'currency'
	});

	// convert to human-readable-format
	return f.format(amount / 100);
};
