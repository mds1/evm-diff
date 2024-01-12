import { Language, Node, NodeType } from '@/types';

const lighthouse: Node = {
  name: 'lighthouse',
  description: 'Ethereum consensus client in Rust.',
  type: NodeType.Consensus,
  language: Language.Rust,
  repository: 'https://github.com/sigp/lighthouse',
  documentation: 'https://lighthouse-book.sigmaprime.io/',
};

const lodestar: Node = {
  name: 'lodestar',
  description: 'TypeScript Implementation of Ethereum Consensus.',
  type: NodeType.Consensus,
  language: Language.TypeScript,
  repository: 'https://github.com/ChainSafe/lodestar',
  documentation: 'https://lodestar.chainsafe.io/',
};

const nimbus: Node = {
  name: 'nimbus',
  description: 'Nim implementation of the Ethereum Beacon Chain.',
  type: NodeType.Consensus,
  language: Language.Nim,
  repository: 'https://github.com/status-im/nimbus-eth2',
  documentation: 'https://nimbus.guide/',
};

const prysm: Node = {
  name: 'prysm',
  description: 'Go implementation of Ethereum proof of stake.',
  type: NodeType.Consensus,
  language: Language.Go,
  repository: 'https://github.com/prysmaticlabs/prysm',
  documentation: 'https://prysmaticlabs.com/',
};

const teku: Node = {
  name: 'teku',
  description: 'Java Implementation of the Ethereum 2.0 Beacon Chain.',
  type: NodeType.Consensus,
  language: Language.Java,
  repository: 'https://github.com/Consensys/teku',
  documentation: 'https://docs.teku.consensys.io/',
};

export const consensusNodes: Node[] = [lighthouse, lodestar, nimbus, prysm, teku];
