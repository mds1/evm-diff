import { CURRENT_MAINNET_HARDFORK } from './constants';

export enum Hardforks {
  Frontier,
  Homestead,
  DaoFork,
  TangerineWhistle,
  SpuriousDragon,
  Byzantium,
  Constantinople,
  Petersburg, // This hard fork doesn't exist in ethereum/execution-specs
  Istanbul,
  MuirGlacier,
  Berlin,
  London,
  ArrowGlacier,
  GrayGlacier,
  Paris,
  Shanghai,
}

// Retrieve all the hard forks from the starting hard fork to the current mainnet hard fork.
export const getHardforksFrom = (startingHardfork: Hardforks): string[] =>
  getHardforksFromTo(startingHardfork, CURRENT_MAINNET_HARDFORK);

// Retrieve an array of hardforks from a starting hardfork to an ending hardfork (exclusive).
export const getHardforksFromTo = (start: Hardforks, end: Hardforks): string[] => {
  if (start > end) {
    throw new Error(
      `Error: the starting hard fork ${Hardforks[start]} (index: ${start}) occured after the ending hard fork ${Hardforks[end]} (index: ${end}). Arguments are wrong or must have been reversed.`
    );
  }

  // Create an array made of all the enum key indexes following by all the stringified keys.
  // For example, if you had an enum with two keys A and B, you would get ['0', '1', 'A', 'B'].
  // Then, we only keep the slice with the values (e.g. ['A', 'B']).
  const array = Object.keys(Hardforks);
  const length = array.length / 2;
  const keys = array.slice(length);
  return keys.slice(start, end);
};