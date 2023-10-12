export function generateOTP(): string {
	return `${Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000}`;
}

export function randomUUID(): string {
	return crypto.randomUUID();
}

export function generateSlug(str: string): string {
	const trimmedString = str.trim();
	const cleanedString = trimmedString.replace(/[^\w\s-]/g, '');
	const formattedString = cleanedString.replace(/\s+/g, '-').toLowerCase();

	return formattedString;
}
