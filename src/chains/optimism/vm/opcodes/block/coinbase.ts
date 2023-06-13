import { UndefinedOpcode } from '@/chains/types';

// TODO: It's not clear if this opcode is a no-op or if it will revert.
export const coinbase: UndefinedOpcode = {
  number: 0x41,
  name: 'coinbase',
  description: 'The opcode is not defined on Optimism',
  references: [
    'https://community.optimism.io/docs/developers/build/differences/#opcode-differences',
  ],
};
