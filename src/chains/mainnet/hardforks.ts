export enum MainnetHardfork {
	Frontier = 0,
	Homestead = 1,
	DaoFork = 2,
	TangerineWhistle = 3,
	SpuriousDragon = 4,
	Byzantium = 5,
	Constantinople = 6,
	// The Petersburg hard fork doesn't exist in ethereum/execution-specs so we do not reference it.
	Istanbul = 7,
	MuirGlacier = 8,
	Berlin = 9,
	London = 10,
	ArrowGlacier = 11,
	GrayGlacier = 12,
	Paris = 13,
	Shanghai = 14,
}

export const CURRENT_MAINNET_HARDFORK = MainnetHardfork.Shanghai;

// Retrieve all the hard forks from the starting hard fork to the current mainnet hard fork.
export const getMainnetHardforksFrom = (startingHardfork: MainnetHardfork): string[] =>
	getMainnetHardforksFromTo(startingHardfork, CURRENT_MAINNET_HARDFORK);

// Retrieve an array of hardforks from a starting hardfork to an ending hardfork (inclusive).
export const getMainnetHardforksFromTo = (
	start: MainnetHardfork,
	end: MainnetHardfork,
): string[] => {
	if (start > end) {
		throw new Error(
			`Error: the starting hard fork ${MainnetHardfork[start]} (index: ${start}) occured after the ending hard fork ${MainnetHardfork[end]} (index: ${end}). Arguments are wrong or must have been reversed.`,
		);
	}

	// Create an array made of all the enum key indexes following by all the stringified keys.
	// For example, if you had an enum with two keys A and B, you would get ['0', '1', 'A', 'B'].
	// Then, we only keep the slice with the values (e.g. ['A', 'B']).
	const array = Object.keys(MainnetHardfork);
	const length = array.length / 2;
	const keys = array.slice(length);
	return keys.slice(start, end + 1);
};
