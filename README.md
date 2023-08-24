# EVM Diff

Diff EVM-compatible chains in a friendly format.

> [!NOTE]
> Support EVM Diff by contributing to our [Gitcoin grant](https://explorer.gitcoin.co/#/round/10/0x8de918f0163b2021839a8d84954dd7e8e151326d/0x8de918f0163b2021839a8d84954dd7e8e151326d-145) during this matching round!

> [!IMPORTANT]
> This site is under active development. Check out the [issues](https://github.com/mds1/evm-diff/issues) if you'd like to contribute.

## Overview

There are lots of EVM-compatible chains, and they can differ in various, subtle ways.
Developers write contracts intended to be deployed on multiple chains and therefore need to be aware of these differences.

Currently finding this information can be tedious because:

- It requires checking each chain's documentation.
- May require digging through node implementations.
- Chains compare themselves to Ethereum, but not to each other.

As L2s aim to scale horizontally with more chains (such as the [Optimism Superchain](https://app.optimism.io/superchain) and new [Arbitrum chains](https://docs.arbitrum.foundation/new-arb-chains)), developers will want to compare those chains against both the "base" optimism/arbitrum chains, and Ethereum mainnet.

Sites like [op-geth](https://op-geth.optimism.io/) are excellent for comparing the actual code, but for smart contract and application developers, this is too low-level to be easily digestible.

EVM Diff aims to solve these problems, by allowing you to diff the execution-level specifications of EVM-compatible chains in an easy-to-read format.

## Status

This project is in the early stages of development, and should not yet be relied on.

The initial goal is to have a full diff between mainnet, Optimism, and Arbitrum, and then expand to other chains from there. Starting with these chains seems ideal because they have good documentation and they are the most popular L2s (by [TVL](https://l2beat.com/scaling/tvl)).

See the open [issues](https://github.com/mds1/evm-diff/issues) for current needs, and feel free to create new issues for bugs, feature requests, or other ideas.

If you want to contribute, please see [CONTRIBUTING.md](./CONTRIBUTING.md).
**Some issues have bounties attached**, which will be paid out on Optimism in OP tokens.[^1] Please be sure to read [CONTRIBUTING.md](./CONTRIBUTING.md) to understand how the bounty process works.

[^1]: Thanks to Optimism RPGF, as these bounties were made possible by an [RPGF grant](https://optimism.mirror.xyz/Upn_LtV2-3SviXgX_PE_LyA7YI00jQyoM1yf55ltvvI) I received for [Multicall3](https://github.com/mds1/multicall).
