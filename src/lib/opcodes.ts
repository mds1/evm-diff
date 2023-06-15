import { pad } from 'viem';
import {
  ETHEREUM_EXECUTION_SPECS_COMMIT_ID,
  ETHEREUM_EXECUTION_SPECS_URL,
  EVM_OPCODES_URL,
} from './constants';

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

// Returns a hex string (without the '0x' prefix) padded to 2 characters.
const formatOpcodeNumber = (n: number) => {
  return n.toString(16).padStart(2, '0');
};

export const ethSpecsOpcodeSrc = (group: OpcodeGroups, line: number): string =>
  `${ETHEREUM_EXECUTION_SPECS_URL}/blob/${ETHEREUM_EXECUTION_SPECS_COMMIT_ID}/src/ethereum/shanghai/vm/instructions/${group}.py#${line}`;

export const evmCodesOpcodesLink = (opcodeNumber: number): string => {
  return `${EVM_OPCODES_URL}/#${formatOpcodeNumber(opcodeNumber)}`;
};

export const evmCodesPlaygroundLink = (codeParam: string): string =>
  `${EVM_OPCODES_URL}/playground?unit=Wei&codeType=Mnemonic&code=${codeParam}`;
