import { pad } from 'viem';

// Takes an arbitrary number of class names, filtering out any falsey values.
export const classNames = (...classes: (string | boolean)[]) => classes.filter(Boolean).join(' ');

// Given a `record` (i.e. an object), return an array of its values sorted by the given `field`.
// Make sure the field is a number or string or the sort behavior based on `>` and `<` may be
// undefined.
export const sortedArrayByField = <T extends number | string | symbol, U, K extends keyof U>(
  record: Record<T, U>,
  field: K
): U[] => {
  return (Object.values(record) as U[]).sort((a, b) => {
    if (a[field] > b[field]) return 1;
    if (a[field] < b[field]) return -1;
    return 0;
  });
};

// Returns a hex string with a leading `0x` and padded to 2 characters.
export const formatPrefixByte = (prefix: number) => {
  return pad(`0x${prefix.toString(16).toUpperCase()}`, { size: 1 });
};

export const toUppercase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
