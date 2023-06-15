import { ETH_SPECS_COMMIT_ID } from './constants';

export enum OpcodeGroups {
  Arithmetic = 'arithmetic',
  Bitwise = 'bitwise',
  Block = 'block',
  Comparison = 'comparison',
  ControlFlow = 'control_flow',
  Environment = 'environment',
  Keccak = 'keccak',
  Log = 'log',
  Memory = 'memory',
  Stack = 'stack',
  Storage = 'storage',
  System = 'system',
}

export const ethSpecsOpcodeSrc = (group: OpcodeGroups, line: number): string =>
  `https://github.com/ethereum/execution-specs/blob/${ETH_SPECS_COMMIT_ID}/src/ethereum/shanghai/vm/instructions/${group}.py#${line}`;

export const evmCodesLink = (opcodeNumber: string): string =>
  `https://www.evm.codes/#${opcodeNumber}`;
