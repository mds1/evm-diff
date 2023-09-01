import { Mempool } from '@/types';

const flashbotsProtect: Mempool = {
  name: 'Flashbots Protect',
  description:
    'The Flashbots Protect RPC provides frontrunning protection for Ethereum transactions, along with other benefits.',
  rpcUrl: 'https://rpc.flashbots.net',
  references: [
    '[Flashbots Protect documentation](https://docs.flashbots.net/flashbots-protect/overview)]',
  ],
  notes: [
    'Transactions that perform simple actions—such as token approvals or transfers—will be sent to the public mempool as these do not need frontrunning protection.',
    'Transactions may be emitted to the public mempool if you switch RPC endpoints from Flashbots Protect RPC to another RPC while your transactions are pending.',
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

const secureRpc: Mempool = {
  name: 'SecureRpc',
  description:
    'A bare-metal, fully conformant JSON-RPC/gRPC infrastructure plane that aims to meet various requirements around performance, privacy, and more.',
  rpcUrl: 'https://api.securerpc.com/v1',
  references: ['[SecureRpc Documentation](https://securerpc.com/)]'],
  notes: [],
  properties: {
    isPrivate: true,
    isFree: true,
    configurable: false,
  },
};

const mevBlocker: Mempool = {
  name: 'MEV Blocker',
  description:
    'MEV Blocker offers protection from frontrunning and sandwich attacks for a broad spectrum of Ethereum transactions.',
  rpcUrl: 'https://rpc.mevblocker.io',
  references: ['[MEV Blocker website](https://mevblocker.io/)]'],
  notes: [
    'Historical submitted bundles, including those that did not land on-chain, will not only be shared with builders but also archived and presented to the public for transparency.',
    'For complete privacy, you can use an RPC URL of https://rpc.mevblocker.io/norefunds, which comes at the cost of no longer getting refunds for MEV your transaction generates.',
    'You can prevent reverting transactions from being included by using an RPC URL of https://rpc.mevblocker.io/noreverts, but this comes at the cost of slower inclusion time.',
  ],
  properties: {
    isPrivate: true,
    tracksIpAddress: false,
    refundsMev: true,
    includesFailedTxs: true,
    canSpecifyBuilders: false,
    isFree: true,
    configurable: false,
  },
};

const bloxroute: Mempool = {
  name: 'bloXroute ETH Protect',
  description:
    'ETH Protect provides reliable and free front-running protection for Metamask transactions on the Ethereum Mainnet network.',
  rpcUrl: 'https://eth-protect.rpc.blxrbdn.com',
  references: [
    '[ETH Protect RPC documentation](https://docs.flashbots.net/flashbots-protect/overview)]',
  ],
  notes: [],
  properties: {
    isPrivate: true,
    isFree: true,
  },
};

const eden: Mempool = {
  name: 'Eden RPC',
  description:
    'Eden RPC makes it easy for everyday users and developers to use Eden for frontrunning protection.',
  rpcUrl: 'https://api.edennetwork.io/v1/rpc',
  references: ['[Eden documentation](https://docs.edennetwork.io/eden-rpc/overview)]'],
  notes: [
    'Eden RPC is currently in public beta.',
    'For faster inclusion you can use an RPC URL of https://api.edennetwork.io/v1/rocket. This cannot guarantee transactions are frontrun, but the third-parties receiving the transaction have no known history of frontrunning their users.',
  ],
  properties: {
    isPrivate: true,
    isFree: true,
  },
};

export const mempools = {
  [flashbotsProtect.name]: flashbotsProtect,
  [secureRpc.name]: secureRpc,
  [mevBlocker.name]: mevBlocker,
  [bloxroute.name]: bloxroute,
  [eden.name]: eden,
};
