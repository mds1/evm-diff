import { signatureTypes as mainnetSignatureTypes } from '@/chains/mainnet/signatureTypes';
import { SignatureType } from '@/types';

const txTypeDocs =
  '[Arbitrum Transaction Types](https://developer.arbitrum.io/arbos/geth#transaction-types)';

const arbitrumDepositTx: SignatureType = {
  prefixByte: 0x64,
  description:
    "Represents a user deposit from L1 to L2. This increases the user's balance by the amount deposited on L1.",
  signedData: ['`keccak256(0x64 || rlp([chainId, l1RequestId, from, to, value]))`'],
  signs: 'transaction',
  references: [
    txTypeDocs,
    'https://github.com/OffchainLabs/go-ethereum/blob/dcd0ff9ad8b4c84a9456c6b37f9047233adf7181/core/types/transaction.go#L48',
    'https://github.com/OffchainLabs/go-ethereum/blob/dcd0ff9ad8b4c84a9456c6b37f9047233adf7181/core/types/arb_types.go#L371-L377',
  ],
};

const arbitrumUnsignedTx: SignatureType = {
  prefixByte: 0x65,
  description:
    "A message from a user on L1 to a contract on L2 that uses the bridge for authentication instead of requiring the user's signature.",
  signedData: [
    '`keccak256(0x65 || rlp([chainId, from, nonce, maxFeePerGas, gasLimit, to, value, data]))`',
  ],
  signs: 'transaction',
  references: [
    txTypeDocs,
    'https://github.com/OffchainLabs/go-ethereum/blob/dcd0ff9ad8b4c84a9456c6b37f9047233adf7181/core/types/transaction.go#L49',
    'https://github.com/OffchainLabs/go-ethereum/blob/dcd0ff9ad8b4c84a9456c6b37f9047233adf7181/core/types/arb_types.go#L48-L58',
  ],
};

const arbitrumContractTx: SignatureType = {
  prefixByte: 0x66,
  description:
    "Similar to an `ArbitrumUnsignedTx` but intended for smart contracts. Uses the bridge's unique, sequential nonce rather than requiring the caller specify their own.",
  signedData: [
    '`keccak256(0x66 || rlp([chainId, requestId, from, maxFeePerGas, gasLimit, to, value, data]))`',
  ],
  signs: 'transaction',
  references: [
    txTypeDocs,
    'https://github.com/OffchainLabs/go-ethereum/blob/dcd0ff9ad8b4c84a9456c6b37f9047233adf7181/core/types/transaction.go#L50',
    'https://github.com/OffchainLabs/go-ethereum/blob/dcd0ff9ad8b4c84a9456c6b37f9047233adf7181/core/types/arb_types.go#L116-L126',
  ],
};

const arbitrumSubmitRetryableTx: SignatureType = {
  prefixByte: 0x69,
  description: 'A retryable submission and may schedule an ArbitrumRetryTx if provided enough gas.',
  signedData: [
    '`keccak256(0x69 || rlp([chainId, requestId, from, l1BaseFee, depositValue, maxFeePerGas, gasLimit, retryTo, retryValue, beneficiary, maxSubmissionFee, feeRefundAddress, retryData]))`',
  ],
  signs: 'transaction',
  references: [
    txTypeDocs,
    'https://github.com/OffchainLabs/go-ethereum/blob/dcd0ff9ad8b4c84a9456c6b37f9047233adf7181/core/types/transaction.go#L52',
    'https://github.com/OffchainLabs/go-ethereum/blob/dcd0ff9ad8b4c84a9456c6b37f9047233adf7181/core/types/arb_types.go#L258-L273',
  ],
};

const arbitrumRetryTx: SignatureType = {
  prefixByte: 0x68,
  description:
    'Transactions scheduled by calls to the redeem precompile method and via retryable auto-redemption.',
  signedData: [
    '`keccak256(0x68 || rlp([chainId, nonce, from, maxFeePerGas, gasLimit, to, value, data, ticketId, refundTo, maxRefund, submissionFeeRefund]))`',
  ],
  signs: 'transaction',
  references: [
    txTypeDocs,
    'https://github.com/OffchainLabs/go-ethereum/blob/dcd0ff9ad8b4c84a9456c6b37f9047233adf7181/core/types/transaction.go#L51',
    'https://github.com/OffchainLabs/go-ethereum/blob/dcd0ff9ad8b4c84a9456c6b37f9047233adf7181/core/types/arb_types.go#L180-L194',
  ],
};

const arbitrumInternalTx: SignatureType = {
  prefixByte: 0x6a,
  description: 'ArbOS-created transaction to update state between user-generated transactions.',
  signedData: ['`keccak256(0x6a || rlp([chainId, data]))`'],
  signs: 'transaction',
  references: [
    txTypeDocs,
    'https://github.com/OffchainLabs/go-ethereum/blob/dcd0ff9ad8b4c84a9456c6b37f9047233adf7181/core/types/transaction.go#L53',
    'https://github.com/OffchainLabs/go-ethereum/blob/dcd0ff9ad8b4c84a9456c6b37f9047233adf7181/core/types/arb_types.go#L424-L427',
  ],
};

const arbitrumLegacyTx: SignatureType = {
  prefixByte: 0x78,
  description: 'A legacy transaction',
  signedData: mainnetSignatureTypes[0x00].signedData,
  signs: 'transaction',
  references: [
    'https://github.com/OffchainLabs/go-ethereum/blob/a2132df21812259f604855f8ae399745fa9b6de6/core/types/transaction.go#L54',
    ...mainnetSignatureTypes[0x00].references,
  ],
};

export const signatureTypes = {
  ...mainnetSignatureTypes,
  ...{ [arbitrumDepositTx.prefixByte]: arbitrumDepositTx },
  ...{ [arbitrumUnsignedTx.prefixByte]: arbitrumUnsignedTx },
  ...{ [arbitrumContractTx.prefixByte]: arbitrumContractTx },
  ...{ [arbitrumSubmitRetryableTx.prefixByte]: arbitrumSubmitRetryableTx },
  ...{ [arbitrumRetryTx.prefixByte]: arbitrumRetryTx },
  ...{ [arbitrumInternalTx.prefixByte]: arbitrumInternalTx },
  ...{ [arbitrumLegacyTx.prefixByte]: arbitrumLegacyTx },
};
