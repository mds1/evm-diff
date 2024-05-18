# Contributing

## Issues

See the open [issues](https://github.com/mds1/evm-diff/issues) for current needs, and feel free to create new issues for bugs, feature requests, or other ideas.

## Development

If you are interested in working on an issue, please comment on the issue so it can be assigned to you.
Before opening a PR, run `bun check` to ensure linting and formatting are correct.

This repo uses [Next.js](https://github.com/vercel/next.js/), [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss), [TypeScript](https://github.com/microsoft/TypeScript), [bun](https://bun.sh/), and [viem](https://github.com/wagmi-dev/viem).

To get started building the app:

```sh
# Install dependencies.
bun install

# Start the development server.
bun dev

# Format files.
bun fmt

# Lint.
bun lint

# Add a new chain to the UI, format, and lint.
bun check
```

To fetch chain data use the below commands.
It's recommend to have an `INFURA_API_KEY` set in your environment to improve performance.

```bash
# Fetch all data for a single chain.
bun fetch-data [chainId]

# Fetch all data for all chains.
bun fetch-data

# Add a new chain to the UI, format, and lint.
bun check
```
