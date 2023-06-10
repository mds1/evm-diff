import { Opcode } from "@/chains/types";
import { opcodes as mainnetArithmeticOpcodes } from "@/chains/mainnet/vm/opcodes/arithmetic";
import { opcodes as blockOpcodes } from "./block";
import { opcodes as mainnetMemoryOpcodes } from "@/chains/mainnet/vm/opcodes/memory";

const modifiedOpcodes: Opcode[] = [
  ...blockOpcodes,
]

const mainnetOpcodes: Opcode[] = [
  ...mainnetArithmeticOpcodes,
  ...mainnetMemoryOpcodes,
];

export const opcodes: Opcode[] = [...modifiedOpcodes, ...mainnetOpcodes];
