import { MainnetHardfork } from '@/chains/mainnet/hardforks';
import {
  ETHEREUM_EXECUTION_SPECS_COMMIT_ID,
  ETHEREUM_EXECUTION_SPECS_URL,
  EVM_OPCODES_URL,
} from './constants';

export enum OpcodeGroup {
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
const formatOpcodeNumber = (n: number): string => n.toString(16).padStart(2, '0');

// Returns a link to the Ethereum execution specs for the given hardfork, opcode, and line number.
export const ethSpecsOpcodeSrc = (
  hardfork: MainnetHardfork,
  group: OpcodeGroup,
  line: number
): string =>
  `${ETHEREUM_EXECUTION_SPECS_URL}/blob/${ETHEREUM_EXECUTION_SPECS_COMMIT_ID}/src/ethereum/${MainnetHardfork[
    hardfork
  ].toLowerCase()}/vm/instructions/${group}.py#L${line}`;

export const evmCodesOpcodesLink = (opcodeNumber: number): string =>
  `${EVM_OPCODES_URL}/#${formatOpcodeNumber(opcodeNumber)}`;

export const evmCodesPlaygroundLink = (codeParam: string): string =>
  `${EVM_OPCODES_URL}/playground?unit=Wei&codeType=Mnemonic&code=${codeParam}`;
