import { signatureTypes as mainnetSignatureTypes } from '@/chains/mainnet/signatureTypes';
import type { SignatureType } from '@/types';

const depositTx: SignatureType = {
  prefixByte: 0x7e,
  description: 'An L2 transaction that was derived from L1 and included in a L2 block',
  signedData: [
    '`keccak256(0x7E || rlp([sourceHash, from, to, mint, value, gas, isSystemTx, data]))`',
  ],
  signs: 'transaction',
  references: [
    'https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/deposits.md#the-deposited-transaction-type',
    'https://github.com/ethereum-optimism/specs/blob/main/specs/glossary.md#deposited-transaction',
  ],
  notes: [
    `There are two kinds of deposited transactions:
- [L1 attributes deposited transaction][l1-attr-deposit], which submits the L1 block's attributes to the [L1 Attributes Predeployed Contract][l1-attr-predeploy].
- [User-deposited transactions][user-deposited], which are transactions derived from an L1 call to the [deposit contract][deposit-contract].`,
	],
};

export const signatureTypes = {
	...mainnetSignatureTypes,
	...{ [depositTx.prefixByte]: depositTx },
};
