// Given an Etherscan URL, fetch the ABI and convert it to viem's human readable format.
// Example usage:
//   bun script/json-abi-to-viem-human-readable.ts https://arbiscan.io/address/0x0000000000000000000000000000000000000064
import { formatAbi } from 'abitype';
import clipboardy from 'clipboardy';

// Define configuration for each chain.
async function main() {
  const chains = {
    arbitrum: {
      urlPart: 'arbiscan',
      apiPrefix: 'api.',
      apiKey: process.env.ARBISCAN_API_KEY,
      rpcUrl: process.env.ARBITRUM_ONE_RPC_URL,
    },
    optimism: {
      urlPart: 'optimistic',
      apiPrefix: 'api-',
      apiKey: process.env.OPTIMISM_API_KEY,
      rpcUrl: process.env.OPTIMISM_RPC_URL,
    },
  };

  // Use the first argument as the URL and get the contract address from it.
  const url = process.argv[2];
  if (!url) throw new Error('URL is required');
  const address = url.split('/').pop();

  // Determine the chain and apiKey based on the URL.
  let chain, apiKey, apiPrefix;
  for (const chainName in chains) {
    const data = chains[chainName as keyof typeof chains];
    if (url.includes(data.urlPart)) {
      chain = chainName;
      apiKey = data.apiKey;
      apiPrefix = data.apiPrefix;
      break;
    }
  }

  if (!chain) throw new Error(`Chain not recognized from URL: ${url}`);

  // Send API request to fetch the ABI.
  const parsedUrl = new URL(url);
  const chainBaseUrl = parsedUrl.hostname; // e.g. "arbiscan.io" or "etherscan.io"

  // Construct the API URL
  const apiUrl = `https://${apiPrefix}${chainBaseUrl}/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`;

  // Fetch the ABI from the API
  const response = await fetch(apiUrl);
  const data = await response.json();
  if (data.status !== '1') throw new Error('API request failed: ' + data.message);
  const abi = JSON.parse(data.result);
  const formattedAbi = formatAbi(abi);

  // TODO Support proxy contracts.
  // Some predeploys are proxies, so we check for that and try to fetch the implementation ABI also.
  // There are multiple ways to implement a proxy, so we check each of the below methods and use
  // the first one that returned an address that has code with an ABI:
  //   1. Check for an `implementation()(address)` function.
  //   2. Check for a `getProxyImplementation()(address)` function.
  //   3. ERC-1967 logic address slot.
  //   4. ERC-1967 beacon address slot (requires a call to `implementation()(address)` on the beacon).
  //   5. Bytes 11 through 30 of the bytecode are where the implementation address for ERC-1167
  //      proxies are stored.
  // When whatsabi is updated to support proxies, we can rely on that (https://github.com/shazow/whatsabi/issues/11)
  // --- proxy support not yet implemented ---

  // Copy the formatted ABI to the clipboard.
  clipboardy.writeSync(JSON.stringify(formattedAbi));
  console.log(`✅ Copied viem human readable ABI to clipboard for ${chain} contract ${address}`);
}

main().catch(console.error);
