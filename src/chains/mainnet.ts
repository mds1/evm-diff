import { mainnet as mainnetMetadata } from '@wagmi/chains';
import { Chain, Precompile } from '@/chains';

export const precompiles: Precompile[] = [
  {
    address: '0x0000000000000000000000000000000000000001',
    name: 'ecRecover',
    description: 'Elliptic curve digital signature algorithm (ECDSA) public key recovery function',
    minGas: 3000,
    input: [
      {
        byteStart: 0,
        byteLength: 32,
        name: 'hash',
        description: 'The Keccak-256 hash of the signed message',
      },
      {
        byteStart: 32,
        byteLength: 32,
        name: 'v',
        description: 'Recovery identifier, expected to be either 27 or 28',
      },
      {
        byteStart: 64,
        byteLength: 32,
        name: 'r',
        description: 'x-coordinate, expected to be in the range (0, secp256k1.n)',
      },
      {
        byteStart: 96,
        byteLength: 32,
        name: 's',
        description: 'Expected to be in the range  (0, secp256k1.n)',
      },
    ],
    output: [
      {
        byteStart: 0,
        byteLength: 32,
        name: 'publicAddress',
        description: 'The recovered 20-byte address right aligned to 32 bytes',
      },
    ],
    references: [
      'https://github.com/ethereum/execution-specs/blob/master/src/ethereum/shanghai/vm/precompiled_contracts/ecrecover.py',
      'https://github.com/ethereum/execution-specs/blob/master/src/ethereum/shanghai/vm/gas.py#L50',
      'https://github.com/ethereum/execution-specs/blob/master/src/ethereum/shanghai/vm/precompiled_contracts/__init__.py#L30',
    ],
  },
];

export const mainnet: Chain = {
  metadata: mainnetMetadata,
  precompiles,
};
