// Given a JSON ABI on the clipboard, replace the clipboard contents with a viem human-readable ABI.
// Example usage:
//   bun script/json-abi-to-viem-human-readable.ts
import { formatAbi } from 'abitype';
import clipboardy from 'clipboardy';

const abi = clipboardy.readSync();
const formattedAbi = formatAbi(JSON.parse(abi));
clipboardy.writeSync(JSON.stringify(formattedAbi));
console.log('✅ Copied formatted ABI to clipboard');
