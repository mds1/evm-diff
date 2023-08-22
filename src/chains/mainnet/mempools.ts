import { Mempool } from '@/types';

const flashbotsProtect: Mempool = {
  name: 'Flashbots Protect',
  description:
    'The Flashbots Protect RPC provides frontrunning protection for Ethereum transactions, along with other benefits',
  rpcUrl: 'https://rpc.flashbots.net',
  references: [
    '[Flashbots Protect documentation](https://docs.flashbots.net/flashbots-protect/overview)]',
  ],
  notes: [
    'Transactions that perform simple actions—such as token approvals or transfers—will be sent to the public mempool as these do not need frontrunning protection.',
    'Transactions may be emitted to the public mempool if you switch RPC endpoints from Flashbots Protect RPC to another RPC while your transactions are pending.'
  ],
  properties: {
    isPrivate: true,
    tracksIpAddress: false,
    refundsMev: true,
    includesFailedTxs: false,
    canSpecifyBuilders: true,
    isFree: true,
    configurable: true,
    txLifespan: 360,
    rateLimit: '80 requests/second',
    burstRateLimit: '100 requests/second',
  },
};

export const mempools = {
  [flashbotsProtect.name]: flashbotsProtect,
};
