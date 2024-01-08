import { consensusNodes as mainnetConsensusNodes } from '@/chains/mainnet/nodes/consensus';
import { executionNodes as mainnetExecutionNodes } from '@/chains/mainnet/nodes/execution';
import { Node } from '@/types';

export const executionNodes: Node[] = mainnetExecutionNodes;
export const consensusNodes: Node[] = mainnetConsensusNodes;
