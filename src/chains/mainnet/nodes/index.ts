import { Nodes } from '@/types/node';
import { consensusNodes } from './consensus';
import { executionNodes } from './execution';

export const nodes: Nodes = {
  execution: executionNodes,
  consensus: consensusNodes,
};
