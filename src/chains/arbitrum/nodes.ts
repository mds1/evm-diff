import { Language, type Node, NodeType } from '@/types';

const nitro: Node = {
	name: 'nitro',
	description:
		'Nitro is the latest iteration of the Arbitrum technology. It is a fully integrated, complete layer 2 optimistic rollup system, including fraud proofs, the sequencer, the token bridges, advanced calldata compression, and more.',
	type: NodeType.Execution,
	language: Language.Go,
	repository: 'https://github.com/OffchainLabs/nitro',
	documentation: 'https://docs.arbitrum.io/',
};

export const executionNodes: Node[] = [nitro];
export const consensusNodes: Node[] = []; // Arbitrum does not have any consensus nodes.
