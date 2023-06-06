# Contributing

This repo uses Next.js, Tailwind CSS, TypeScript, pnpm, and viem. To get started:

```sh
# Install dependencies.
pnpm install

# Start the development server.
pnpm dev

# Format files.
pnpm fmt
```

See the open [issues](https://github.com/mds1/evm-diff/issues) for current needs, and feel free to create new issues for bugs, feature requests, or other ideas.

## Architecture

The specs for each chain live in `src/chains/[chainName]/*.ts`.
Each chain's folder is structured similar to the [ethereum/execution-specs](https://github.com/ethereum/execution-specs) repo.
For example, the `src/ethereum/shanghai` folder in that repo contains the specs for the latest hard fork (Shanghai) on Ethereum mainnet, and information about precompiles lives in the `vm/precompiled_contracts` subfolder.
That folder contains one file for each precompile.
Since EVM Diff doesn't have to actually implement the precompiles, we just use a single file for all precompile data, which lives in this repo at `src/chains/mainnet/vm/precompiles.ts`.

As more aspects of the execution spec are added, they should be added in such a way to continue this pattern of mirroring the structure of the execution-specs repo.
