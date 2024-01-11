import { Language, Node, NodeType, SyncStrategy } from '@/types';

const besu: Node = {
  name: 'besu',
  description: 'An enterprise-grade Java-based, Apache 2.0 licensed Ethereum client.',
  type: NodeType.Execution,
  language: Language.Java,
  syncStrategy: [SyncStrategy.Snap, SyncStrategy.Fast, SyncStrategy.Full],
  repository: 'https://github.com/hyperledger/besu',
  documentation: 'https://besu.hyperledger.org/',
};

const coregeth: Node = {
  name: 'core-geth',
  description: 'A highly configurable Go implementation of the Ethereum protocol.',
  type: NodeType.Execution,
  language: Language.Go,
  syncStrategy: [SyncStrategy.Snap, SyncStrategy.Full],
  repository: 'https://github.com/etclabscore/core-geth',
  documentation: 'https://etclabscore.github.io/core-geth/',
};

const erigon: Node = {
  name: 'erigon',
  description: 'Ethereum implementation on the efficiency frontier.',
  type: NodeType.Execution,
  language: Language.Go,
  syncStrategy: [SyncStrategy.Full],
  repository: 'https://github.com/ledgerwatch/erigon',
  documentation: 'https://erigon.gitbook.io/erigon/',
};

const geth: Node = {
  name: 'geth',
  description: 'Official Go implementation of the Ethereum protocol.',
  type: NodeType.Execution,
  language: Language.Go,
  syncStrategy: [SyncStrategy.Snap, SyncStrategy.Full],
  repository: 'https://github.com/ethereum/go-ethereum',
  documentation: 'https://geth.ethereum.org/',
};

const nethermind: Node = {
  name: 'nethermind',
  description: 'A robust execution client for Ethereum node operators.',
  type: NodeType.Execution,
  language: Language.CSharp,
  syncStrategy: [SyncStrategy.Snap, SyncStrategy.Fast, SyncStrategy.Full],
  repository: 'https://github.com/NethermindEth/nethermind',
  documentation: 'https://docs.nethermind.io/',
};

const reth: Node = {
  name: 'reth',
  description:
    'Modular, contributor-friendly and blazing-fast implementation of the Ethereum protocol, in Rust.',
  type: NodeType.Execution,
  language: Language.Rust,
  syncStrategy: [SyncStrategy.Full],
  repository: 'https://github.com/paradigmxyz/reth',
  documentation: 'https://paradigmxyz.github.io/reth/',
};

export const executionNodes: Node[] = [besu, coregeth, erigon, geth, nethermind, reth];
