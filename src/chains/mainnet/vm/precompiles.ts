import { Precompile } from '@/chains';

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
    input: [
      {
        byteStart: 0,
        byteLength: 32,
        name: 'data',
        description: 'Input data',
      },
    ],
    output: [
      {
        byteStart: 0,
        byteLength: 32,
        name: 'data',
        description: 'Same as the input',
      },
    ],
    references: [],
  },
  {
    address: '0x0000000000000000000000000000000000000005',
    name: 'modexp',
    description: 'Arbitrary-precision exponentiation under modulo',
    minGas: 200,
    input: [
      {
        byteStart: 0,
        byteLength: 32,
        name: 'Bsize',
        description: 'Byte size of B',
      },
      {
        byteStart: 32,
        byteLength: 32,
        name: 'Esize',
        description: 'Byte size of E',
      },
      {
        byteStart: 64,
        byteLength: 32,
        name: 'Msize',
        description: 'Byte size of M',
      },
      {
        byteStart: 96,
        byteLength: 96 + 32,
        name: 'B',
        description: 'Base as unsigned integer',
      },
      {
        byteStart: 96 + 32,
        byteLength: 96 + 32 + 32,
        name: 'E',
        description: 'Exponent as unsigned integer, if zero, then B ** E will be one',
      },
      {
        byteStart: 96 + 32 + 32,
        byteLength: 96 + 32 + 32 + 32,
        name: 'M',
        description: 'Modulo as unsigned integer, if zero, then returns zero',
      },
    ],
    output: [
      {
        byteStart: 0,
        byteLength: 32,
        name: 'value',
        description: 'Result of the computation, with the same number of bytes as M',
      }
    ],
    references: [],
  },
  {
    address: '0x0000000000000000000000000000000000000006',
    name: 'ecAdd',
    description: "Point addition (ADD) on the elliptic curve 'alt_bn128'",
    minGas: 150,
    input: [
      {
        byteStart: 0,
        byteLength: 32,
        name: 'x1',
        description: "X coordinate of the first point on the elliptic curve 'alt_bn128'",
      },
      {
        byteStart: 32,
        byteLength: 32,
        name: 'y1',
        description: "Y coordinate of the first point on the elliptic curve 'alt_bn128'",
      },
      {
        byteStart: 64,
        byteLength: 32,
        name: 'x2',
        description: "X coordinate of the second point on the elliptic curve 'alt_bn128'",
      },
      {
        byteStart: 96,
        byteLength: 32,
        name: 'y2',
        description: "Y coordinate of the second point on the elliptic curve 'alt_bn128'",
      },
    ],
    output: [
      {
        byteStart: 0,
        byteLength: 32,
        name: 'x',
        description: "X coordinate of the result point on the elliptic curve 'alt_bn128'",
      },
      {
        byteStart: 32,
        byteLength: 32,
        name: 'y',
        description: "Y coordinate of the result point on the elliptic curve 'alt_bn128'",
      }
    ],
    references: [],
  },
  {
    address: '0x0000000000000000000000000000000000000007',
    name: 'ecMul',
    description: "Scalar multiplication (MUL) on the elliptic curve 'alt_bn128'",
    minGas: 6000,
    input: [
      {
        byteStart: 0,
        byteLength: 32,
        name: 'x1',
        description: "X coordinate of the first point on the elliptic curve 'alt_bn128'",
      },
      {
        byteStart: 32,
        byteLength: 32,
        name: 'y1',
        description: "Y coordinate of the first point on the elliptic curve 'alt_bn128'",
      },
      {
        byteStart: 64,
        byteLength: 32,
        name: 's',
        description: "Scalar to use for the multiplication",
      },
    ],
    output: [
      {
        byteStart: 0,
        byteLength: 32,
        name: 'x',
        description: "X coordinate of the result point on the elliptic curve 'alt_bn128'",
      },
      {
        byteStart: 32,
        byteLength: 32,
        name: 'y',
        description: "Y coordinate of the result point on the elliptic curve 'alt_bn128'",
      }
    ],
    references: [],
  },
  {
    address: '0x0000000000000000000000000000000000000008',
    name: 'ecPairing',
    description: "Bilinear function on groups on the elliptic curve 'alt_bn128'",
    minGas: 45000,
    input: [
      {
        byteStart: 0,
        byteLength: 32,
        name: 'x1',
        description: "X coordinate of the first point on the elliptic curve 'alt_bn128'",
      },
      {
        byteStart: 32,
        byteLength: 32,
        name: 'y1',
        description: "Y coordinate of the first point on the elliptic curve 'alt_bn128'",
      },
      {
        byteStart: 64,
        byteLength: 32,
        name: 'x3',
        description: "X coordinate of the third point on the elliptic curve 'alt_bn128'",
      },
      {
        byteStart: 96,
        byteLength: 32,
        name: 'x2',
        description: "X coordinate of the second point on the elliptic curve 'alt_bn128'",
      },
      {
        byteStart: 128,
        byteLength: 32,
        name: 'y3',
        description: "Y coordinate of the third point on the elliptic curve 'alt_bn128'",
      },
      {
        byteStart: 160,
        byteLength: 32,
        name: 'y2',
        description: "Y coordinate of the second point on the elliptic curve 'alt_bn128'",
      },
    ],
    output: [
      {
        byteStart: 0,
        byteLength: 32,
        name: 'success',
        description: "1 if the pairing was a success, 0 otherwise",
      },
    ],
    references: [],
  },
  {
    address: '0x0000000000000000000000000000000000000009',
    name: 'blake2f',
    description: 'Compression function F used in the BLAKE2 cryptographic hashing algorithm',
    minGas: 0,
    input: [
      {
        byteStart: 0,
        byteLength: 4,
        name: 'rounds',
        description: "Number of rounds (big-endian unsigned integer)",
      },
      {
        byteStart: 4,
        byteLength: 64,
        name: 'h',
        description: "State vector (8 8-byte little-endian unsigned integer)",
      },
      {
        byteStart: 68,
        byteLength: 128,
        name: 'm',
        description: "Message block vector (16 8-byte little-endian unsigned integer)",
      },
      {
        byteStart: 196,
        byteLength: 16,
        name: 't',
        description: "Offset counters (2 8-byte little-endian integer)",
      },
      {
        byteStart: 212,
        byteLength: 1,
        name: 'f',
        description: "Y coordinate of the third point on the elliptic curve 'alt_bn128'",
      },
    ],
    output: [
      {
        byteStart: 0,
        byteLength: 64,
        name: 'h',
        description: "State vector (8 8-byte little-endian unsigned integer)",
      },
    ],
    references: [],
  },
];
