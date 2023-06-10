import { Opcode } from "@/chains/types";
import { number } from "./number";
import { blockhash } from "./blockhash";

export const opcodes: Opcode[] = [
  blockhash,
  number,
];
