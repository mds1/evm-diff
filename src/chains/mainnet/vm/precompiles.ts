import type { Precompile } from '@/types';

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
		deprecated: false,
		references: [
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/ecrecover.py',
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/gas.py#L50',
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/__init__.py#L30',
		],
		notes: [
			"If an address cannot be recovered or not enough gas was given, then there is no return data, indicating a precompile contract error. Note that the return data is the address that issued the signature but it won't verify the signature.",
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
				name: 'data',
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
		deprecated: false,
		references: [
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/sha256.py',
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/gas.py#L51',
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/__init__.py#L31',
		],
		notes: [
			'If not enough gas was given, then there is no return data, indicating a precompile contract error.',
		],
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
				name: 'data',
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
		deprecated: false,
		references: [
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/ripemd160.py',
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/gas.py#L53',
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/__init__.py#L32',
		],
		notes: [
			'If not enough gas was given, then there is no return data, indicating a precompile contract error.',
		],
	},
	{
		address: '0x0000000000000000000000000000000000000004',
		name: 'identity',
		description: 'Returns the input',
		minGas: 15,
		input: [
			{
				byteStart: 0,
				byteLength: -1, // -1 to indicate variable length.
				name: 'data',
				description: 'Data to return',
			},
		],
		output: [
			{
				byteStart: 0,
				byteLength: -1, // -1 to indicate variable length.
				name: 'data',
				description: 'Data from input',
			},
		],
		deprecated: false,
		references: [
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/identity.py',
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/gas.py#L55',
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/__init__.py#L33',
		],
		notes: [
			'If not enough gas was given, then there is no return data, indicating a precompile contract error.',
			'The identity function is typically used to copy a chunk of memory.',
		],
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
				byteLength: '96 + Bsize',
				name: 'B',
				description: 'Base as unsigned integer',
			},
			{
				byteStart: '96 + Bsize',
				byteLength: 'Bsize + Esize',
				name: 'E',
				description: 'Exponent as unsigned integer, if zero, then B ** E will be one',
			},
			{
				byteStart: '96 + Bsize + Esize',
				byteLength: 'Bsize + Esize + Msize',
				name: 'M',
				description: 'Modulo as unsigned integer, if zero, then returns zero',
			},
		],
		output: [
			{
				byteStart: 0,
				byteLength: 'Msize',
				name: 'value',
				description: 'Result of the computation, with the same number of bytes as M',
			},
		],
		deprecated: false,
		references: [
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/modexp.py',
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/modexp.py#L167',
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/__init__.py#L34',
		],
		notes: [
			'If not enough gas was given, then there is no return data, indicating a precompile contract error.',
		],
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
				description: "x-coordinate of the first point on the elliptic curve 'alt_bn128'",
			},
			{
				byteStart: 32,
				byteLength: 32,
				name: 'y1',
				description: "y-coordinate of the first point on the elliptic curve 'alt_bn128'",
			},
			{
				byteStart: 64,
				byteLength: 32,
				name: 'x2',
				description: "x-coordinate of the second point on the elliptic curve 'alt_bn128'",
			},
			{
				byteStart: 96,
				byteLength: 32,
				name: 'y2',
				description: "y-coordinate of the second point on the elliptic curve 'alt_bn128'",
			},
		],
		output: [
			{
				byteStart: 0,
				byteLength: 32,
				name: 'x',
				description: "x-coordinate of the result point on the elliptic curve 'alt_bn128'",
			},
			{
				byteStart: 32,
				byteLength: 32,
				name: 'y',
				description: "y-coordinate of the result point on the elliptic curve 'alt_bn128'",
			},
		],
		deprecated: false,
		references: [
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/alt_bn128.py#L33',
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/alt_bn128.py#L45',
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/__init__.py#L35',
		],
		notes: [
			'If the input is not valid, all gas provided is consumed and there is no return data, indicating a precompile contract error.',
			'If not enough gas was given, there is no return data.',
			'The gas cost is fixed at 150. However, if the input does not allow to compute a valid result, all the gas sent is consumed.',
			'The point at infinity is encoded with both field x and y at 0.',
		],
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
				description: "x-coordinate of the first point on the elliptic curve 'alt_bn128'",
			},
			{
				byteStart: 32,
				byteLength: 32,
				name: 'y1',
				description: "y-coordinate of the first point on the elliptic curve 'alt_bn128'",
			},
			{
				byteStart: 64,
				byteLength: 32,
				name: 's',
				description: 'Scalar to use for the multiplication',
			},
		],
		output: [
			{
				byteStart: 0,
				byteLength: 32,
				name: 'x',
				description: "x-coordinate of the result point on the elliptic curve 'alt_bn128'",
			},
			{
				byteStart: 32,
				byteLength: 32,
				name: 'y',
				description: "y-coordinate of the result point on the elliptic curve 'alt_bn128'",
			},
		],
		deprecated: false,
		references: [
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/alt_bn128.py#L72',
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/alt_bn128.py#L84',
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/__init__.py#L36',
		],
		notes: [
			'If the input is not valid, all gas provided is consumed and there is no return data, indicating a precompile contract error.',
			'If not enough gas was given, there is no return data.',
			'The gas cost is fixed at 6000. However, if the input does not allow to compute a valid result, all the gas sent is consumed.',
			'The point at infinity is encoded with both field x and y at 0.',
		],
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
				description: "x-coordinate of the first point on the elliptic curve 'alt_bn128'",
			},
			{
				byteStart: 32,
				byteLength: 32,
				name: 'y1',
				description: "y-coordinate of the first point on the elliptic curve 'alt_bn128'",
			},
			{
				byteStart: 64,
				byteLength: 32,
				name: 'x2',
				description: "x-coordinate of the second point on the elliptic curve 'alt_bn128'",
			},
			{
				byteStart: 96,
				byteLength: 32,
				name: 'y2',
				description: "y-coordinate of the second point on the elliptic curve 'alt_bn128'",
			},
			{
				byteStart: 192,
				byteLength: 32,
				name: 'xn',
				description:
					"x-coordinate of the n-th point on the elliptic curve 'alt_bn128', where n must be a multiple of 3",
			},
			{
				byteStart: 224,
				byteLength: 32,
				name: 'yn',
				description:
					"y-coordinate of the n-th point on the elliptic curve 'alt_bn128', where n must be a multiple of 3",
			},
		],
		output: [
			{
				byteStart: 0,
				byteLength: 32,
				name: 'success',
				description: '1 if the pairing was a success, 0 otherwise',
			},
		],
		deprecated: false,
		references: [
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/alt_bn128.py#L107',
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/alt_bn128.py#L119',
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/__init__.py#L37',
		],
		notes: [
			'If the input is not valid, all gas provided is consumed and there is no return data, indicating a precompile contract error.',
			'If not enough gas was given, there is no return data.',
			'The input must always be a multiple of 6 32-byte values. 0 inputs is valid and returns 1.',
			'The point at infinity is encoded with both field x and y at 0.',
		],
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
				description: 'Number of rounds (big-endian unsigned integer)',
			},
			{
				byteStart: 4,
				byteLength: 64,
				name: 'h',
				description: 'State vector (8 8-byte little-endian unsigned integer)',
			},
			{
				byteStart: 68,
				byteLength: 128,
				name: 'm',
				description: 'Message block vector (16 8-byte little-endian unsigned integer)',
			},
			{
				byteStart: 196,
				byteLength: 16,
				name: 't',
				description: 'Offset counters (2 8-byte little-endian integer)',
			},
			{
				byteStart: 212,
				byteLength: 1,
				name: 'f',
				description: 'Final block indicator flag (0 or 1)',
			},
		],
		output: [
			{
				byteStart: 0,
				byteLength: 64,
				name: 'h',
				description: 'State vector (8 8-byte little-endian unsigned integer)',
			},
		],
		notes: [
			'If the input is not valid or does not allow a valid result to be computed, all gas provided is consumed and there is no return data, indicating a precompile contract error.',
			'If not enough gas was given, there is no return data.',
		],
		deprecated: false,
		references: [
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/blake2f.py',
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/gas.py#L59',
			'https://github.com/ethereum/execution-specs/blob/6f8614566e7117afa327ad054c3f4bfe19694d73/src/ethereum/shanghai/vm/precompiled_contracts/__init__.py#L38',
		],
	},
];
