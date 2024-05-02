import { pad } from 'viem';
import type { Chain } from '@/types';

// Takes an arbitrary number of class names, filtering out any falsey values.
export const classNames = (...classes: (string | boolean)[]) => classes.filter(Boolean).join(' ');

// Copies the provided text to the clipboard
export const copyToClipboard = (text: string) => {
	navigator.clipboard.writeText(text).then(
		() => {},
		(err) => console.error('Could not copy text to clipboard: ', err),
	);
};

// Given a `record` (i.e. an object), return an array of its values sorted by the given `field`.
// Make sure the field is a number or string or the sort behavior based on `>` and `<` may be
// undefined.
export const sortedArrayByField = <T extends number | string | symbol, U, K extends keyof U>(
	record: Record<T, U>,
	field: K,
): U[] => {
	return (Object.values(record) as U[]).sort((a, b) => {
		if (a[field] > b[field]) return 1;
		if (a[field] < b[field]) return -1;
		return 0;
	});
};

// Given a `record` (i.e. an object), return an array of its values sorted by the given `fields`,
// in the order specified.
// Make sure the field is a number or string or the sort behavior based on `>` and `<` may be
// undefined.
export const sortedArrayByFields = <T extends number | string | symbol, U, K extends keyof U>(
	record: Record<T, U>,
	fields: K[],
): U[] => {
	return (Object.values(record) as U[]).sort((a, b) => {
		for (const field of fields) {
			if (a[field] > b[field]) return 1;
			if (a[field] < b[field]) return -1;
		}
		return 0;
	});
};

// Returns a hex string with a leading `0x` and padded to 2 characters.
export const formatPrefixByte = (prefix: number) => {
	return pad(`0x${prefix.toString(16).toUpperCase()}`, { size: 1 });
};

export const toUppercase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const chainLogoUrl = (chain: Chain) => {
	if (chain.metadata.id === 42161) return 'https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg';
	return `https://icons.llamao.fi/icons/chains/rsz_${chain.metadata.name.toLowerCase()}.jpg`;
};
