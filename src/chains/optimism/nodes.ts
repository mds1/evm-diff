import { Language, Node, NodeType } from '@/types';
import { nethermind, reth } from '../mainnet/nodes/execution';

// Execution nodes.
const opGeth: Node = {
  name: 'op-geth',
  description:
    'Official Golang execution layer implementation of the Ethereum protocol. It implements the Execution-Layer, with minimal changes for a secure Ethereum-equivalent application environment.',
  type: NodeType.Execution,
  language: Language.Go,
  forkOf: 'geth',
  repository: 'https://github.com/ethereum-optimism/op-geth',
  documentation: 'https://op-geth.optimism.io/',
};

const opErigon: Node = {
  name: 'op-erigon',
  description: 'Optimism implementation on the efficiency frontier',
  type: NodeType.Execution,
  language: Language.Go,
  forkOf: 'erigon',
  repository: 'https://github.com/testinprod-io/op-erigon',
  documentation: 'https://op-erigon.testinprod.io/',
};

// Consensus nodes.
const opNode: Node = {
  name: 'op-node',
  description:
    'Implements most rollup-specific functionality as Consensus-Layer, similar to a L1 beacon-node.',
  type: NodeType.Consensus,
  language: Language.Go,
  repository: 'https://github.com/ethereum-optimism/optimism',
  documentation: 'https://docs.optimism.io/',
};

export const executionNodes: Node[] = [opGeth, opErigon, reth, nethermind];
export const consensusNodes: Node[] = [opNode];
