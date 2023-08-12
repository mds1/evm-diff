import { SignatureType } from '@/types';

const eip2718 = 'https://eips.ethereum.org/EIPS/eip-2718';
const sigTypes =
  'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/lists/signature-types/README.md';

// Some signature prefix bytes are invalid because they collide with the initial byte of valid RLP
// encoded transactions. The range of invalid prefix bytes is 0xc0-0xff, which is a length of 64.
const invalidSigTypes: SignatureType[] = [...Array(64).keys()].map((i) => ({
  prefixByte: i + 0xc0,
  description: 'Invalid; collides with the initial byte of valid RLP encoded transactions',
  signedData: undefined,
  signs: undefined,
  references: [sigTypes],
}));

export const validSigTypes: SignatureType[] = [
  {
    prefixByte: 0x0,
    description: 'Legacy (untyped) transaction',
    signedData: [
      '`keccak256(rlp([nonce, gasPrice, gasLimit, to, value, data]))`',
      '`keccak256(rlp([nonce, gasPrice, gasLimit, to, value, data, chainId, 0, 0]))`',
    ],
    signs: 'transaction',
    references: ['https://eips.ethereum.org/EIPS/eip-155', eip2718, sigTypes],
    notes: [
      "When signing over chain ID, the signature's v-value is computed as `{0,1} + chainId * 2 + 35`, where 0 and 1 are signature's y-parity.",
    ],
  },
  {
    prefixByte: 0x1,
    description: 'EIP-2930 Access list transaction',
    signedData: [
      '`keccak256(0x01 || rlp([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList]))`',
    ],
    signs: 'transaction',
    references: ['https://eips.ethereum.org/EIPS/eip-2930', eip2718, sigTypes],
  },
  {
    prefixByte: 0x2,
    description: 'EIP-1559 transaction',
    signedData: [
      '`keccak256(0x02 || rlp([chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, to, value, data, accessList]))`',
    ],
    signs: 'transaction',
    references: ['https://eips.ethereum.org/EIPS/eip-1559', eip2718, sigTypes],
  },
  {
    prefixByte: 0x3,
    description: 'Unused, but tentatively reserved for EIP-3074',
    signedData: ['`keccak256(0x03 || chainId || paddedInvokerAddress || commit)`'],
    signs: 'transaction',
    references: ['https://eips.ethereum.org/EIPS/eip-3074', eip2718, sigTypes],
  },
  {
    prefixByte: 0x19,
    description:
      'Used for signatures of data payloads to prevent collisions between data signatures and transaction signatures',
    signedData: ['`keccak256(0x19 || 1-byte-version || versionSpecificData || dataToSign)`'],
    signs: 'data',
    references: ['https://eips.ethereum.org/EIPS/eip-191', sigTypes],
  },
  ...invalidSigTypes,
];

const allSigTypes = [...validSigTypes, ...invalidSigTypes];

// Reshape into a map where the key is the prefix byte.
export const signatureTypes: Record<number, SignatureType> = allSigTypes.reduce((acc, sigType) => {
  acc[sigType.prefixByte] = sigType;
  return acc;
}, {} as Record<number, SignatureType>);
