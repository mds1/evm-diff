# Contributing

This repo uses [Next.js](https://github.com/vercel/next.js/), [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss), [TypeScript](https://github.com/microsoft/TypeScript), [pnpm](https://github.com/pnpm/pnpm), and [viem](https://github.com/wagmi-dev/viem). To get started:

```sh
# Install dependencies.
pnpm install

# Start the development server.
pnpm dev

# Format files.
pnpm fmt
```

See the open [issues](https://github.com/mds1/evm-diff/issues) for current needs, and feel free to create new issues for bugs, feature requests, or other ideas.

## Bounties

Issues with bounties will have something like "(bounty: 100 OP 🔴)" at the end of the issue title, where `100 OP` is the number of OP tokens paid out for this bounty.

To apply for and claim a bounty:

1. Leave a brief comment explaining your work plan (may be very brief is issue is well-scoped), and wait to begin work until you are assigned to the issue. If you have any questions about the issue scope, you can ask here. There is no guarantee that leaving a comment means you will be assigned.
2. I'm not aware of any github issue bounty platforms that allow payments in OP on Optimism, so there is no intermediary managing the bounties. This means you have to trust that I'll pay it out, which I will if the work meets the issue's requirements and is sufficiently high quality to close that issue.
3. Feel free to open a draft PR before completion if you have any questions.
4. Include your **Optimism** payout address in the PR description, and once the PR is reviewed and merged I will transfer the OP tokens.

## Architecture

The specs for each chain live in `src/chains/[chainName]/*.ts`.
Each chain's folder is structured similar to the [ethereum/execution-specs](https://github.com/ethereum/execution-specs) repo.
For example, the `src/ethereum/shanghai` folder in that repo contains the specs for the latest hard fork (Shanghai) on Ethereum mainnet, and information about precompiles lives in the `vm/precompiled_contracts` subfolder.
That folder contains one file for each precompile.
Since EVM Diff doesn't have to actually implement the precompiles, we just use a single file for all precompile data, which lives in this repo at `src/chains/mainnet/vm/precompiles.ts`.

As more aspects of the execution spec are added, they should be added in such a way to continue this pattern of mirroring the structure of the execution-specs repo.
