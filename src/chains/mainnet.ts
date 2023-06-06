import { mainnet as mainnetMetadata } from '@wagmi/chains';
import { Chain, Precompile } from '@/chains';

// TODO the input and output fields are not used yet therefore not all of them are filled out.
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
  {
    address: '0x0000000000000000000000000000000000000002',
    name: 'SHA2-256',
    description: 'SHA2-256 hash function',
    minGas: 60,
    input: [
      {
        byteStart: 0,
        byteLength: -1, // -1 to indicate variable length.
        name: 'inputData',
        description: 'Data to be hashed with SHA2-256',
      },
    ],
    output: [
      {
        byteStart: 0,
        byteLength: 32,
        name: 'hash',
        description: 'The SHA-256 hash of the input data',
      },
    ],
    references: [],
  },
  {
    address: '0x0000000000000000000000000000000000000003',
    name: 'RIPEMD-160',
    description: 'RIPEMD-160 hash function',
    minGas: 600,
    input: [
      {
        byteStart: 0,
        byteLength: -1, // -1 to indicate variable length.
        name: 'inputData',
        description: 'Data to be hashed with RIPEMD-160',
      },
    ],
    output: [
      {
        byteStart: 0,
        byteLength: 32,
        name: 'hash',
        description: 'The resulting 20-byte hash right aligned to 32 bytes',
      },
    ],
    references: [],
  },
  {
    address: '0x0000000000000000000000000000000000000004',
    name: 'identity',
    description: 'Returns the input',
    minGas: 15,
    input: [],
    output: [],
    references: [],
  },
  {
    address: '0x0000000000000000000000000000000000000005',
    name: 'modexp',
    description: 'Arbitrary-precision exponentiation under modulo',
    minGas: 200,
    input: [],
    output: [],
    references: [],
  },
  {
    address: '0x0000000000000000000000000000000000000006',
    name: 'ecAdd',
    description: "Point addition (ADD) on the elliptic curve 'alt_bn128'",
    minGas: 150,
    input: [],
    output: [],
    references: [],
  },
  {
    address: '0x0000000000000000000000000000000000000007',
    name: 'ecMul',
    description: "Scalar multiplication (MUL) on the elliptic curve 'alt_bn128'",
    minGas: 6000,
    input: [],
    output: [],
    references: [],
  },
  {
    address: '0x0000000000000000000000000000000000000008',
    name: 'ecPairing',
    description: "Bilinear function on groups on the elliptic curve 'alt_bn128'",
    minGas: 45000,
    input: [],
    output: [],
    references: [],
  },
  {
    address: '0x0000000000000000000000000000000000000009',
    name: 'blake2f',
    description: 'Compression function F used in the BLAKE2 cryptographic hashing algorithm',
    minGas: 0,
    input: [],
    output: [],
    references: [],
  },
];

export const mainnet: Chain = {
  metadata: mainnetMetadata,
  precompiles,
};
