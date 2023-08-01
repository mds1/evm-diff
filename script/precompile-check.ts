// Docs sometimes conflate precompiles and predeploys, but we want to differentiate them. We define
// a precompile as an address that has no code (or symbolic code like `0xfe`) and a predeploy has
// executable bytecode. For each chain this script defines a list of addresses and checks whether
// they are precompiles or predeploys, and prints the result.
// Example usage:
//   bun script/precompile-check.ts optimism
import { Address, createPublicClient, getAddress, http } from 'viem';
import { Chain, arbitrum, optimism } from 'viem/chains';

type ChainConfig = {
  addresses: Address[];
  chain: Chain;
  rpcUrl: string;
};

const addressMap: Record<string, ChainConfig> = {
  arbitrum: {
    chain: arbitrum,
    rpcUrl: process.env.ARBITRUM_RPC_URL!,
    addresses: [
      '0x5288c571Fd7aD117beA99bF60FE0846C4E84F933',
      '0x09e9222E96E7B4AE2a407B98d48e330053351EEe',
      '0x096760F208390250649E3e8763348E783AEF5562',
      '0x6c411aD3E74De3E7Bd422b94A27770f5B86C623B',
      '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
      '0xd570aCE65C43af47101fC6250FD6fC63D1c22a86',
      '0x0000000000000000000000000000000000000064',
      '0x000000000000000000000000000000000000006E',
      '0x000000000000000000000000000000000000006C',
      '0x0000000000000000000000000000000000000066',
      '0x000000000000000000000000000000000000006F',
      '0x00000000000000000000000000000000000000C8',
      '0x0000000000000000000000000000000000000067',
      '0x0000000000000000000000000000000000000065',
      '0x0000000000000000000000000000000000000070',
      '0x000000000000000000000000000000000000006b',
      '0x000000000000000000000000000000000000006D',
      '0x0000000000000000000000000000000000000068',
    ],
  },
  optimism: {
    chain: optimism,
    rpcUrl: process.env.OPTIMISM_RPC_URL!,
    addresses: [
      '0x4200000000000000000000000000000000000000',
      '0x4200000000000000000000000000000000000002',
      '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
      '0x4200000000000000000000000000000000000006',
      '0x4200000000000000000000000000000000000007',
      '0x4200000000000000000000000000000000000010',
      '0x4200000000000000000000000000000000000011',
      '0x4200000000000000000000000000000000000012',
      '0x4200000000000000000000000000000000000013',
      '0x420000000000000000000000000000000000000F',
      '0x4200000000000000000000000000000000000042',
      '0x4200000000000000000000000000000000000015',
      '0x4200000000000000000000000000000000000016',
      '0x4200000000000000000000000000000000000014',
      '0x4200000000000000000000000000000000000017',
      '0x4200000000000000000000000000000000000018',
      '0x4200000000000000000000000000000000000019',
      '0x420000000000000000000000000000000000001a',
    ],
  },
};

async function main() {
  const chainName = process.argv[2];
  const chainData = addressMap[chainName];
  const { chain, rpcUrl, addresses } = chainData;
  if (!addresses) throw new Error(`Unknown chain: ${chainName}`);
  if (!rpcUrl) throw new Error(`Undefined RPC URL for chain: ${chainName}`);

  const transport = http(rpcUrl, { batch: true });
  const client = createPublicClient({ chain, transport });

  const promises = addresses.map((address) => client.getBytecode({ address }));
  const codes = await Promise.all(promises);
  const kinds = codes.map((code) =>
    code === '0x' || code === '0xfe' ? 'precompile' : 'predeploy'
  );

  addresses.forEach((address, i) => console.log(`${getAddress(address)}  ${kinds[i]}`));
}

main().catch(console.error);
