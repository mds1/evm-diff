# EVM Diff

Diff EVM-compatible chains in a friendly format.

⚠️ **This site is a work in progress and should not yet be relied on. Check out the [issues](https://github.com/mds1/evm-diff/issues) if you'd like to contribute.**

## Overview

There's lot of EVM-compatible chains, and they can differ in various, subtle ways.
Developers write contracts intended to be deployed on multiple chains, and therefore need to be aware of these differences.

Currently finding this information can be tedious because:

- It requires checking each chain's documentation.
- May require digging through node implementations.
- Chains compare themselves to Ethereum, but not to each other.

As L2s aim to scale horizontally with more chains (such as the [Optimism Superchain](https://app.optimism.io/superchain) and new [Arbitrum chains](https://docs.arbitrum.foundation/new-arb-chains)), developers will want to compare those chains against both the "base" optimism/arbitrum chains, and Ethereum mainnet.

Sites like [op-geth](https://op-geth.optimism.io/) are excellent for comparing the actual code, but for smart contract and application developers this is too low-level to be easily digestible.

EVM Diff aims to solve these problems, by allowing you to diff the execution-level specifications of EVM-compatible chains in an easy-to-read format.

## Status

This project is in the early stages of development, and should not yet be trusted.

See the open [issues](https://github.com/mds1/evm-diff/issues) for current needs, and feel free to create new issues for bugs, feature requests, or other ideas.

If you want to contribute, please see [CONTRIBUTING.md](./CONTRIBUTING.md).
