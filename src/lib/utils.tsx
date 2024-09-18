import { getAddress, pad, type Address } from 'viem';
import chains from '@/lib/chains.json';

// Takes an arbitrary number of class names, filtering out any falsey values.
export const classNames = (...classes: (string | boolean)[]) => classes.filter(Boolean).join(' ');

// Returns a hex string with a leading `0x` and padded to 2 characters.
export const toUppercaseHex = (prefix: number) => {
	return pad(`0x${prefix.toString(16).toUpperCase()}`, { size: 1 });
};

// Given a chain object, returns the URL of the chain's logo.
export const chainLogoUrl = (chain: { name: string; chainId: number }) => {
	if (chain.chainId === 1) return 'https://icons.llamao.fi/icons/chains/rsz_ethereum.jpg';
	if (chain.chainId === 137) return 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg';
	if (chain.chainId === 1088) return 'https://icons.llamao.fi/icons/chains/rsz_metis.jpg';
	if (chain.chainId === 42161) return 'https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg';
	if (chain.chainId === 43114) return 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg';
	return `https://icons.llamao.fi/icons/chains/rsz_${chain.name.toLowerCase()}.jpg`;
};

export const chainNameFromId = (chainId: number) => {
	if (!chainId) return undefined;
	const chain = chains.find((chain) => chain.chainId === chainId);
	return chain?.name;
};

export const FormattedAddress = ({ addr, className }: { addr: Address; className?: string }) => {
	const a = getAddress(addr);
	return <code className={className}>{`${a.slice(0, 6)}...${a.slice(-4)}`}</code>;
};
